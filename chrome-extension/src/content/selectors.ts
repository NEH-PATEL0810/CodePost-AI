/**
 * All DOM selectors used for LeetCode scraping.
 *
 * ⚠️ Never use querySelector strings outside this file.
 * Centralizing them here makes updates easy when LeetCode changes its HTML.
 * Selectors will be populated in Phase 4.2.
 */
import type { SelectorList} from "./dom/types";

export const SELECTORS: Record<string,SelectorList> = {
    TITLE:[
        "div.text-title-large",
        "[data-cy='question-title']",
        "h1",
    ],
    DESCRIPTION:[
        "div[data-track-load='description_content']",
        ".elfjS",
    ],
    DIFFICULTY:[
        "div.text-difficulty-easy",
        "div.text-difficulty-medium",
        "div.text-difficulty-hard",
        "[diff]",
    ],
    EXAMPLES:[
        "pre",
    ],
    CONSTRAINTS:[
        "ul.mt-4",
    ],
   LANGUAGE: [

    "#editor button[aria-haspopup='dialog']",

    "#editor button[type='button']",

],
    
    CODE_EDITOR:[
        "#fdda0b14-c759-8ad9-4ddd-9fdcd57a96e3",
        "div.view-lines.monaco-scrolltop-container.monaco-readonly.vs"
    ]
};