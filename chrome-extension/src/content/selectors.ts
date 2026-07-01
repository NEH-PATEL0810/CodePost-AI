/**
 * All DOM selectors used for LeetCode scraping.
 *
 * ⚠️ Never use querySelector strings outside this file.
 * Centralizing them here makes updates easy when LeetCode changes its HTML.
 * Selectors will be populated in Phase 4.2.
 */
import type { SelectorList} from "./dom/types";

export const SELECTORA: Record<string,SelectorList> = {
    TITLE:[],
    DESCRIPTION:[],
    DIFFICULTY:[],
    EXAMPLES:[],
    CONSTRAINTS:[],
    LANGUAGE:[],
    CODE_EDITOR:[]
};