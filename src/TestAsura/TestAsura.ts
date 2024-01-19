import { Chapter,
    ChapterDetails,
    ContentRating,
    HomeSection,
    SourceManga,
    PartialSourceManga,
    MangaUpdates,
    PagedResults,
    Request,
    Response,
    SearchRequest,
    DUISection,
    Source,
    SourceInfo,
    SourceStateManager,
    TagSection,
    BadgeColor,
    SourceInterceptor, 
    SourceIntents} from '@paperback/types'
import { parseLangCode } from './Languages'


// This source use Komga REST API
// https://komga.org/guides/rest.html
// Manga are represented by `series`
// Chapters are represented by `books`
// The Basic Authentication is handled by the interceptor
// Code and method used by both the source and the tracker are defined in the duplicated `KomgaCommon.ts` file
// Due to the self hosted nature of Komga, this source requires the user to enter its server credentials in the source settings menu
// Some methods are known to throw errors without specific actions from the user. They try to prevent this behavior when server settings are not set.
// This include:
//  - homepage sections
//  - getTags() which is called on the homepage
//  - search method which is called even if the user search in an other source
export const TestAsuraInfo: SourceInfo = {
    version: '1.0.0',
    name: 'AsuraAiko',
    icon: 'logo.webp',
    author: '@beingsuz',
    authorWebsite: 'https://asura.aiko-sus.xyz/',
    description: 'Extension that pulls manga from a mirror of asurascans',
    contentRating: ContentRating.EVERYONE,
    websiteBaseURL: 'https://asura.aiko-sus.xyz/api',
    intents: SourceIntents.MANGA_CHAPTERS | SourceIntents.HOMEPAGE_SECTIONS | SourceIntents.SETTINGS_UI
}

// Number of items requested for paged requests
const PAGE_SIZE = 25
export const parseMangaStatus = (komgaStatus: string): string => {
    return komgaStatus.toLowerCase()
}
export const capitalize = (tag: string): string => {
    return tag.replace(/^\w/, (c) => c.toUpperCase())
}


function getServerUnavailableMangaTiles() {
    // This tile is used as a placeholder when the server is unavailable
    return [
        App.createPartialSourceManga({
            title: 'Server',
            image: '',
            mangaId: 'placeholder-id',
            subtitle: 'unavailable'
        }),
    ]
}

export class TestAsura extends Source {
    stateManager = App.createSourceStateManager();
    requestManager = App.createRequestManager({
        requestsPerSecond: 4,
        requestTimeout: 20000
    });

    async getMangaDetails(mangaId: string): Promise<SourceManga> {
        /*
                In Komga a manga is represented by a `serie`
                */
        const request = App.createRequest({
            url: `${TestAsuraInfo.websiteBaseURL}/${mangaId}`,
            method: 'GET'
        })
        const response = await this.requestManager.schedule(request, 1)
        const result = typeof response.data === 'string'
            ? JSON.parse(response.data)
            : response.data

        return App.createSourceManga({
            id: mangaId,
            mangaInfo: App.createMangaInfo({
                titles: [result.title],
                image: result.imgUrl,
                status: parseMangaStatus(result.Status),
                artist: result.Artist,
                author: result.Author,
                desc: result.sypnosis ,
                tags: [result.genres],
            })
        })
    }
    async getChapters(mangaId: string): Promise<Chapter[]> {
        /*
                In Komga a chapter is a `book`
                */
        const booksRequest = App.createRequest({
            url: `${TestAsuraInfo.websiteBaseURL}/${mangaId}`,
            param: '?includeChapters=true',
            method: 'GET'
        })
        const booksResponse = await this.requestManager.schedule(booksRequest, 1)
        const booksResult = typeof booksResponse.data === 'string'
            ? JSON.parse(booksResponse.data)
            : booksResponse.data
        const chapters: Chapter[] = []

        const languageCode = parseLangCode("en")



        for (const book of booksResult.chapters) {
            chapters.push(App.createChapter({
                id: book._id,
                chapNum: parseFloat(book.number),
                langCode: languageCode,
                name: `${book.title}`,
                time: new Date(book.date),
                // @ts-ignore
                sortingIndex: book.number
            }))
        }
        return chapters
    }
    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = App.createRequest({
            url: `${TestAsuraInfo.websiteBaseURL}/${mangaId}`,
			param: `?includeChapters=true`,
            method: 'GET'
        })
        const data = await this.requestManager.schedule(request, 1)
        const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data

		let chapterResult = result.chapters.find((chapter: any) => chapter._id === chapterId)
 
        // Determine the preferred reading direction which is only available in the serie metadata
        
        return App.createChapterDetails({
            id: chapterResult._id,
            mangaId: mangaId,
            pages: chapterResult.images
        })
    }
    override async getSearchResults(searchQuery: SearchRequest, metadata: any): Promise<PagedResults> {
        // This function is also called when the user search in an other source. It should not throw if the server is unavailable.
		const page: number = metadata?.page ?? 1
		const request = App.createRequest({
			url: `${TestAsuraInfo.websiteBaseURL}`,
			method: 'GET',
			param: `?page=${page}&limit=${PAGE_SIZE}&search="${searchQuery.title}"`
		})
		console.log(request.param)
		// We don't want to throw if the server is unavailable
		let data: Response
		try {
			data = await this.requestManager.schedule(request, 1)
		}
		catch (error) {
			console.log(`searchRequest failed with error: ${error}`)
			return App.createPagedResults({
				results: getServerUnavailableMangaTiles()
			})
		}
		const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data
		const tiles = []
		for (const serie of result.data) {
			tiles.push(App.createPartialSourceManga({
				title: serie.title,
				image: `${serie.imgUrl}`,
				mangaId: serie.slug,
				subtitle: undefined
			}))
		}
		// If no series were returned we are on the last page
		metadata = tiles.length === 0 ? undefined : { page: page + 1 }
		return App.createPagedResults({
			results: tiles,
			metadata
		})
    }
    override async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        // This function is called on the homepage and should not throw if the server is unavailable
        // We won't use `await this.getKomgaAPI()` as we do not want to throw an error on
        // the homepage when server settings are not set

        // The source define two homepage sections: new and latest
        const sections = []
    

        sections.push(App.createHomeSection({
            id: 'Rating',
            title: 'Featured',
            containsMoreItems: true,
            type: 'featured'
        }));

		sections.push(App.createHomeSection({
			id: 'Followers',
			title: 'Most Followed',
			containsMoreItems: true,
			type: 'singleRowLarge '
		}));

		sections.push(App.createHomeSection({
			id: 'Updated_On',
			title: 'Recently Updated',
			containsMoreItems: true,
			type: 'singleRowLarge '
		}));


        const promises: Promise<void>[] = []
        for (const section of sections) {
            // Let the app load empty tagSections
            sectionCallback(section)
    
            const request = App.createRequest({
                url: TestAsuraInfo.websiteBaseURL,
                param: `?page=1&limit=20&sort=${section.id}`,
                method: 'GET'
            })
            // Get the section data
            promises.push(this.requestManager.schedule(request, 1).then((data) => {
                const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data
                const tiles = []
                for (const serie of result.data) {
                    tiles.push(App.createPartialSourceManga({
                        title: serie.title,
                        image: `${serie.imgUrl}`,
                        mangaId: serie['slug'],
                        subtitle: undefined
                    }))
                }
                section.items = tiles
                sectionCallback(section)
            }))
        }
        // Make sure the function completes
        await Promise.all(promises)
    }
    override async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        const page: number = metadata?.page ?? 1
        const request = App.createRequest({
            url: `${TestAsuraInfo.websiteBaseURL}`,
            param: `?page=${page}&limit=${PAGE_SIZE}&sort=${homepageSectionId}`,
            method: 'GET'
        })
        const data = await this.requestManager.schedule(request, 1)
        const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data
        const tiles: PartialSourceManga[] = []

        for (const serie of result.data) {
            tiles.push(App.createPartialSourceManga({
                title: serie.title,
                image: `${serie.imgUrl}`,
                mangaId: serie.slug,
                subtitle: undefined
            }))
        }
        // If no series were returned we are on the last page
        metadata = tiles.length === 0 ? undefined : { page: page + 1 }
        return App.createPagedResults({
            results: tiles,
            metadata: metadata
        })
    }

    async filterUpdatedManga(mangaUpdatesFoundCallback: (updates: MangaUpdates) => void, time: Date, ids: string[]): Promise<void> {
        // We make requests of PAGE_SIZE titles to `series/updated/` until we got every titles
        // or we got a title which `lastModified` metadata is older than `time`
        let page = 0
        const foundIds: string[] = []
        let loadMore = true
        while (loadMore) {
            const request = App.createRequest({
                url: `${TestAsuraInfo.websiteBaseURL}/`,
                param: `?page=${page}&size=${PAGE_SIZE}`,
                method: 'GET'
            })
            const data = await this.requestManager.schedule(request, 1)
            const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data
            for (const serie of result.data) {
                const serieUpdated = new Date(serie.Updated_On)
                if (serieUpdated >= time) {
                    if (ids.includes(serie)) {
                        foundIds.push(serie)
                    }
                }
                else {
                    loadMore = false
                    break
                }
            }
            // If no series were returned we are on the last page
            if (result.content.length === 0) {
                loadMore = false
            }
            page = page + 1
            if (foundIds.length > 0) {
                mangaUpdatesFoundCallback(App.createMangaUpdates({
                    ids: foundIds
                }))
            }
        }
    }
}
