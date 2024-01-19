(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeColor = void 0;
var BadgeColor;
(function (BadgeColor) {
    BadgeColor["BLUE"] = "default";
    BadgeColor["GREEN"] = "success";
    BadgeColor["GREY"] = "info";
    BadgeColor["YELLOW"] = "warning";
    BadgeColor["RED"] = "danger";
})(BadgeColor = exports.BadgeColor || (exports.BadgeColor = {}));

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],5:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
/**
* @deprecated Use {@link PaperbackExtensionBase}
*/
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    async getTags() {
        // @ts-ignore
        return this.getSearchTags?.();
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    let time;
    let trimmed = Number((/\d*/.exec(timeAgo) ?? [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = exports.SourceIntents = void 0;
var SourceIntents;
(function (SourceIntents) {
    SourceIntents[SourceIntents["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
    SourceIntents[SourceIntents["MANGA_TRACKING"] = 2] = "MANGA_TRACKING";
    SourceIntents[SourceIntents["HOMEPAGE_SECTIONS"] = 4] = "HOMEPAGE_SECTIONS";
    SourceIntents[SourceIntents["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
    SourceIntents[SourceIntents["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
    SourceIntents[SourceIntents["SETTINGS_UI"] = 32] = "SETTINGS_UI";
})(SourceIntents = exports.SourceIntents || (exports.SourceIntents = {}));
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],7:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./ByteArray"), exports);
__exportStar(require("./Badge"), exports);
__exportStar(require("./interfaces"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./HomeSectionType"), exports);
__exportStar(require("./PaperbackExtensionBase"), exports);

},{"./Badge":1,"./ByteArray":2,"./HomeSectionType":3,"./PaperbackExtensionBase":4,"./Source":5,"./SourceInfo":6,"./interfaces":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],15:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./ChapterProviding"), exports);
__exportStar(require("./CloudflareBypassRequestProviding"), exports);
__exportStar(require("./HomePageSectionsProviding"), exports);
__exportStar(require("./MangaProgressProviding"), exports);
__exportStar(require("./MangaProviding"), exports);
__exportStar(require("./RequestManagerProviding"), exports);
__exportStar(require("./SearchResultsProviding"), exports);

},{"./ChapterProviding":8,"./CloudflareBypassRequestProviding":9,"./HomePageSectionsProviding":10,"./MangaProgressProviding":11,"./MangaProviding":12,"./RequestManagerProviding":13,"./SearchResultsProviding":14}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],60:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./DynamicUI/Exports/DUIBinding"), exports);
__exportStar(require("./DynamicUI/Exports/DUIForm"), exports);
__exportStar(require("./DynamicUI/Exports/DUIFormRow"), exports);
__exportStar(require("./DynamicUI/Exports/DUISection"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIHeader"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUILink"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIMultilineLabel"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUINavigationButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIOAuthButton"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISecureInputField"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISelect"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUIStepper"), exports);
__exportStar(require("./DynamicUI/Rows/Exports/DUISwitch"), exports);
__exportStar(require("./Exports/ChapterDetails"), exports);
__exportStar(require("./Exports/Chapter"), exports);
__exportStar(require("./Exports/Cookie"), exports);
__exportStar(require("./Exports/HomeSection"), exports);
__exportStar(require("./Exports/IconText"), exports);
__exportStar(require("./Exports/MangaInfo"), exports);
__exportStar(require("./Exports/MangaProgress"), exports);
__exportStar(require("./Exports/PartialSourceManga"), exports);
__exportStar(require("./Exports/MangaUpdates"), exports);
__exportStar(require("./Exports/PBCanvas"), exports);
__exportStar(require("./Exports/PBImage"), exports);
__exportStar(require("./Exports/PagedResults"), exports);
__exportStar(require("./Exports/RawData"), exports);
__exportStar(require("./Exports/Request"), exports);
__exportStar(require("./Exports/SourceInterceptor"), exports);
__exportStar(require("./Exports/RequestManager"), exports);
__exportStar(require("./Exports/Response"), exports);
__exportStar(require("./Exports/SearchField"), exports);
__exportStar(require("./Exports/SearchRequest"), exports);
__exportStar(require("./Exports/SourceCookieStore"), exports);
__exportStar(require("./Exports/SourceManga"), exports);
__exportStar(require("./Exports/SecureStateManager"), exports);
__exportStar(require("./Exports/SourceStateManager"), exports);
__exportStar(require("./Exports/Tag"), exports);
__exportStar(require("./Exports/TagSection"), exports);
__exportStar(require("./Exports/TrackedMangaChapterReadAction"), exports);
__exportStar(require("./Exports/TrackerActionQueue"), exports);

},{"./DynamicUI/Exports/DUIBinding":17,"./DynamicUI/Exports/DUIForm":18,"./DynamicUI/Exports/DUIFormRow":19,"./DynamicUI/Exports/DUISection":20,"./DynamicUI/Rows/Exports/DUIButton":21,"./DynamicUI/Rows/Exports/DUIHeader":22,"./DynamicUI/Rows/Exports/DUIInputField":23,"./DynamicUI/Rows/Exports/DUILabel":24,"./DynamicUI/Rows/Exports/DUILink":25,"./DynamicUI/Rows/Exports/DUIMultilineLabel":26,"./DynamicUI/Rows/Exports/DUINavigationButton":27,"./DynamicUI/Rows/Exports/DUIOAuthButton":28,"./DynamicUI/Rows/Exports/DUISecureInputField":29,"./DynamicUI/Rows/Exports/DUISelect":30,"./DynamicUI/Rows/Exports/DUIStepper":31,"./DynamicUI/Rows/Exports/DUISwitch":32,"./Exports/Chapter":33,"./Exports/ChapterDetails":34,"./Exports/Cookie":35,"./Exports/HomeSection":36,"./Exports/IconText":37,"./Exports/MangaInfo":38,"./Exports/MangaProgress":39,"./Exports/MangaUpdates":40,"./Exports/PBCanvas":41,"./Exports/PBImage":42,"./Exports/PagedResults":43,"./Exports/PartialSourceManga":44,"./Exports/RawData":45,"./Exports/Request":46,"./Exports/RequestManager":47,"./Exports/Response":48,"./Exports/SearchField":49,"./Exports/SearchRequest":50,"./Exports/SecureStateManager":51,"./Exports/SourceCookieStore":52,"./Exports/SourceInterceptor":53,"./Exports/SourceManga":54,"./Exports/SourceStateManager":55,"./Exports/Tag":56,"./Exports/TagSection":57,"./Exports/TrackedMangaChapterReadAction":58,"./Exports/TrackerActionQueue":59}],61:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./generated/_exports"), exports);
__exportStar(require("./base/index"), exports);
__exportStar(require("./compat/DyamicUI"), exports);

},{"./base/index":7,"./compat/DyamicUI":16,"./generated/_exports":60}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLangCode = void 0;
// const reverseLangCode: {
//     [x: string]: LanguageCode;
// } = {
//     _unknown: LanguageCode.UNKNOWN,
//     bn: LanguageCode.BENGALI,
//     bg: LanguageCode.BULGARIAN,
//     // 'br': LanguageCode.BRAZILIAN,         // use pt: Portuguese
//     zs: LanguageCode.CHINEESE,
//     cs: LanguageCode.CZECH,
//     de: LanguageCode.GERMAN,
//     da: LanguageCode.DANISH,
//     en: LanguageCode.ENGLISH,
//     es: LanguageCode.SPANISH,
//     fi: LanguageCode.FINNISH,
//     fr: LanguageCode.FRENCH,
//     el: LanguageCode.GREEK,
//     // 'hk': LanguageCode.CHINEESE_HONGKONG,
//     hu: LanguageCode.HUNGARIAN,
//     id: LanguageCode.INDONESIAN,
//     he: LanguageCode.ISRELI,
//     hi: LanguageCode.INDIAN,
//     fa: LanguageCode.IRAN,
//     it: LanguageCode.ITALIAN,
//     ja: LanguageCode.JAPANESE,
//     ko: LanguageCode.KOREAN,
//     lt: LanguageCode.LITHUANIAN,
//     mn: LanguageCode.MONGOLIAN,
//     // 'mx': LanguageCode.MEXIAN,        // use es: Spanish
//     // 'my': LanguageCode.MALAY,
//     nl: LanguageCode.DUTCH,
//     no: LanguageCode.NORWEGIAN,
//     fil: LanguageCode.PHILIPPINE,
//     pl: LanguageCode.POLISH,
//     pt: LanguageCode.PORTUGUESE,
//     ro: LanguageCode.ROMANIAN,
//     ru: LanguageCode.RUSSIAN,
//     sa: LanguageCode.SANSKRIT,
//     // 'si': LanguageCode.SAMI,
//     th: LanguageCode.THAI,
//     tr: LanguageCode.TURKISH,
//     uk: LanguageCode.UKRAINIAN,
//     vi: LanguageCode.VIETNAMESE
// };
const parseLangCode = (code) => {
    return code.toUpperCase();
    // // The code can have the format 'en' or 'en-gb'.
    // // We only use the first 2 or 3 letters.
    // // There is 1 three letters code
    // if (code.substr(0, 3) === "fil") {
    //     return LanguageCode.PHILIPPINE;
    // }
    // // Other are two letters codes
    // return reverseLangCode[code.substr(0, 2)] ?? LanguageCode.UNKNOWN;
};
exports.parseLangCode = parseLangCode;

},{}],63:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAsura = exports.capitalize = exports.parseMangaStatus = exports.TestAsuraInfo = void 0;
const types_1 = require("@paperback/types");
const Languages_1 = require("./Languages");
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
exports.TestAsuraInfo = {
    version: '1.2.12',
    name: 'AsuraAiko',
    icon: 'logo.webp',
    author: '@beingsuz',
    authorWebsite: 'https://asura.aiko-sus.xyz/',
    description: 'Extension that pulls manga from a mirror of asurascans',
    contentRating: types_1.ContentRating.EVERYONE,
    websiteBaseURL: 'https://asura.aiko-sus.xyz/api',
    intents: types_1.SourceIntents.MANGA_CHAPTERS | types_1.SourceIntents.HOMEPAGE_SECTIONS | types_1.SourceIntents.SETTINGS_UI
};
// Number of items requested for paged requests
const PAGE_SIZE = 25;
const parseMangaStatus = (komgaStatus) => {
    return komgaStatus.toLowerCase();
};
exports.parseMangaStatus = parseMangaStatus;
const capitalize = (tag) => {
    return tag.replace(/^\w/, (c) => c.toUpperCase());
};
exports.capitalize = capitalize;
function getServerUnavailableMangaTiles() {
    // This tile is used as a placeholder when the server is unavailable
    return [
        App.createPartialSourceManga({
            title: 'Server',
            image: '',
            mangaId: 'placeholder-id',
            subtitle: 'unavailable'
        }),
    ];
}
class TestAsura extends types_1.Source {
    constructor() {
        super(...arguments);
        this.stateManager = App.createSourceStateManager();
        this.requestManager = App.createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 20000
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                    In Komga a manga is represented by a `serie`
                    */
            const request = App.createRequest({
                url: `${exports.TestAsuraInfo.websiteBaseURL}/${mangaId}`,
                method: 'GET'
            });
            const response = yield this.requestManager.schedule(request, 1);
            const result = typeof response.data === 'string'
                ? JSON.parse(response.data)
                : response.data;
            return App.createSourceManga({
                id: mangaId,
                mangaInfo: App.createMangaInfo({
                    titles: [result.title],
                    image: result.imgUrl,
                    status: (0, exports.parseMangaStatus)(result.Status),
                    artist: result.Artist,
                    author: result.Author,
                    desc: result.sypnosis,
                    tags: [result.genres],
                })
            });
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                    In Komga a chapter is a `book`
                    */
            const booksRequest = App.createRequest({
                url: `${exports.TestAsuraInfo.websiteBaseURL}/${mangaId}`,
                param: '?includeChapters=true',
                method: 'GET'
            });
            const booksResponse = yield this.requestManager.schedule(booksRequest, 1);
            const booksResult = typeof booksResponse.data === 'string'
                ? JSON.parse(booksResponse.data)
                : booksResponse.data;
            const chapters = [];
            const languageCode = (0, Languages_1.parseLangCode)("en");
            for (const book of booksResult.chapters) {
                chapters.push(App.createChapter({
                    id: book._id,
                    chapNum: parseFloat(book.number),
                    langCode: languageCode,
                    name: `${book.title}`,
                    time: new Date(book.date),
                    // @ts-ignore
                    sortingIndex: book.number
                }));
            }
            return chapters;
        });
    }
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = App.createRequest({
                url: `${exports.TestAsuraInfo.websiteBaseURL}/${mangaId}`,
                param: `?includeChapters=true`,
                method: 'GET'
            });
            const data = yield this.requestManager.schedule(request, 1);
            const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            let chapterResult = result.chapters.find((chapter) => chapter._id === chapterId);
            // Determine the preferred reading direction which is only available in the serie metadata
            return App.createChapterDetails({
                id: chapterResult._id,
                mangaId: mangaId,
                pages: chapterResult.images
            });
        });
    }
    getSearchResults(searchQuery, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // This function is also called when the user search in an other source. It should not throw if the server is unavailable.
            const page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 0;
            const request = App.createRequest({
                url: `${exports.TestAsuraInfo.websiteBaseURL}`,
                method: 'GET',
                param: `?page=${page}&limit=${PAGE_SIZE}&search=${searchQuery.title}`
            });
            console.log(request.param);
            // We don't want to throw if the server is unavailable
            let data;
            try {
                data = yield this.requestManager.schedule(request, 1);
            }
            catch (error) {
                console.log(`searchRequest failed with error: ${error}`);
                return App.createPagedResults({
                    results: getServerUnavailableMangaTiles()
                });
            }
            const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            const tiles = [];
            for (const serie of result.data) {
                tiles.push(App.createPartialSourceManga({
                    title: serie.title,
                    image: `${serie.imgUrl}`,
                    mangaId: serie.id,
                    subtitle: undefined
                }));
            }
            // If no series were returned we are on the last page
            metadata = tiles.length === 0 ? undefined : { page: page + 1 };
            return App.createPagedResults({
                results: tiles,
                metadata
            });
        });
    }
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            // This function is called on the homepage and should not throw if the server is unavailable
            // We won't use `await this.getKomgaAPI()` as we do not want to throw an error on
            // the homepage when server settings are not set
            // The source define two homepage sections: new and latest
            const sections = [];
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
            const promises = [];
            for (const section of sections) {
                // Let the app load empty tagSections
                sectionCallback(section);
                const request = App.createRequest({
                    url: exports.TestAsuraInfo.websiteBaseURL,
                    param: `?page=1&limit=20&sort=${section.id}`,
                    method: 'GET'
                });
                // Get the section data
                promises.push(this.requestManager.schedule(request, 1).then((data) => {
                    const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
                    const tiles = [];
                    for (const serie of result.data) {
                        tiles.push(App.createPartialSourceManga({
                            title: serie.title,
                            image: `${serie.imgUrl}`,
                            mangaId: serie['slug'],
                            subtitle: undefined
                        }));
                    }
                    section.items = tiles;
                    sectionCallback(section);
                }));
            }
            // Make sure the function completes
            yield Promise.all(promises);
        });
    }
    getViewMoreItems(homepageSectionId, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const page = (_a = metadata === null || metadata === void 0 ? void 0 : metadata.page) !== null && _a !== void 0 ? _a : 1;
            const request = App.createRequest({
                url: `${exports.TestAsuraInfo.websiteBaseURL}`,
                param: `?page=${page}&limit=${PAGE_SIZE}&sort=${homepageSectionId}`,
                method: 'GET'
            });
            const data = yield this.requestManager.schedule(request, 1);
            const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
            const tiles = [];
            for (const serie of result.data) {
                tiles.push(App.createPartialSourceManga({
                    title: serie.title,
                    image: `${serie.imgUrl}`,
                    mangaId: serie.slug,
                    subtitle: undefined
                }));
            }
            // If no series were returned we are on the last page
            metadata = tiles.length === 0 ? undefined : { page: page + 1 };
            return App.createPagedResults({
                results: tiles,
                metadata: metadata
            });
        });
    }
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            // We make requests of PAGE_SIZE titles to `series/updated/` until we got every titles
            // or we got a title which `lastModified` metadata is older than `time`
            let page = 0;
            const foundIds = [];
            let loadMore = true;
            while (loadMore) {
                const request = App.createRequest({
                    url: `${exports.TestAsuraInfo.websiteBaseURL}/`,
                    param: `?page=${page}&size=${PAGE_SIZE}`,
                    method: 'GET'
                });
                const data = yield this.requestManager.schedule(request, 1);
                const result = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
                for (const serie of result.data) {
                    const serieUpdated = new Date(serie.Updated_On);
                    if (serieUpdated >= time) {
                        if (ids.includes(serie)) {
                            foundIds.push(serie);
                        }
                    }
                    else {
                        loadMore = false;
                        break;
                    }
                }
                // If no series were returned we are on the last page
                if (result.content.length === 0) {
                    loadMore = false;
                }
                page = page + 1;
                if (foundIds.length > 0) {
                    mangaUpdatesFoundCallback(App.createMangaUpdates({
                        ids: foundIds
                    }));
                }
            }
        });
    }
}
exports.TestAsura = TestAsura;

},{"./Languages":62,"@paperback/types":61}]},{},[63])(63)
});
