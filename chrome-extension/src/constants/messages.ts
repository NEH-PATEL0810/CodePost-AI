export const APP_MESSAGES = {
    GENERATE:"Generate",
    LOADING:"Generating...",
};

export const PAGE_MESSAGES = {
    READY:"Ready to generate solution.",
    INVALID:"Open a LeetCode problem.",
    CONTEST:"Contest pages are not supported.",
    DISCUSS:"Discuss pages are not supported.",
};


export type ExtensionMessage = | { type:"CHECK_PAGE" } | { type: "PAGE_STATUS" };

