/**
 * Content Script
 *
 * Injected into web pages matching the patterns defined in manifest.ts.
 * Has access to the page DOM but runs in an isolated world.
 * Communicates with the background service worker and popup via chrome.runtime.
 *
 * Responsibilities:
 *  - Listen for EXTRACT_PROBLEM messages and respond with extracted data.
 *  - Page status (isProblem / isContest / isDiscuss) is computed directly
 *    in the popup from the tab URL — no message needed for that.
 */

// ⚠️ Must be first — guards against "Extension context invalidated" errors
// thrown by the @crxjs/vite-plugin HMR client when the extension reloads.
import {
    inspectRuntime
} from "@/diagnostics/runtimeProbe";

import {
    inspectMonaco
} from "@/diagnostics/monacoProbe";

import {
    inspectReact
} from "@/diagnostics/reactProbe";

import {
    inspectEditor
} from "@/diagnostics/editorProbe";
import { installExtensionContextGuard } from "@/utils/extensionContext";
installExtensionContextGuard();

import { inspectFiber } from "@/diagnostics/fiber";
import { extractProblem } from "./extractor";
import { MessageType } from "@/types/messages";
import { debugLog } from "./debug";
import { LOGS } from "@/constants/messages";

debugLog(LOGS.CONTENT_LOADED);
// inspectRuntime();

// inspectMonaco();

// inspectReact();

// inspectEditor();
// inspectFiber();
const problem = extractProblem();
console.log(problem);

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    switch (message.type) {
        case MessageType.EXTRACT_PROBLEM: {
            debugLog(LOGS.EXTRACTION_STARTED);
            const problem = extractProblem();
            debugLog(LOGS.EXTRACTION_COMPLETED, problem);
            sendResponse({ problem });
            break;
        }
    }

    // Return true to keep the message channel open for async responses.
    return true;
});
