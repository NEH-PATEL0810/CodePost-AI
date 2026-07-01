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
    DESCRIPTION:[],
    DIFFICULTY:[
        "div.text-difficulty-easy",
        "div.text-difficulty-medium",
        "div.text-difficulty-hard",
        "[diff]",
    ],
    EXAMPLES:[],
    CONSTRAINTS:[],
    LANGUAGE:[],
    CODE_EDITOR:[]
};