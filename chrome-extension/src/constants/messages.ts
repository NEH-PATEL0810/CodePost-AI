/**
 * User-facing UI strings.
 */
export const APP_MESSAGES = {
    GENERATE: "Generate",
    LOADING: "Generating...",
};

/**
 * Popup page-status messages.
 */
export const PAGE_MESSAGES = {
    READY: "Ready to generate solution.",
    INVALID: "Open a LeetCode problem.",
    CONTEST: "Contest pages are not supported.",
    DISCUSS: "Discuss pages are not supported.",
};

/**
 * Console log labels used with debugLog().
 *
 * Usage:
 *   debugLog(LOGS.EXTRACTION_STARTED, "");
 *
 * Console output:
 *   [CodePost AI] Extraction Started
 */
export const LOGS = {
    CONTENT_LOADED: "Content Script Loaded",
    EXTRACTION_STARTED: "Extraction Started",
    EXTRACTION_COMPLETED: "Extraction Completed",
};