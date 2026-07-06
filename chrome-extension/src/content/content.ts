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
// import {
//     inspectRuntime
// } from "@/diagnostics/runtimeProbe";

// import {
//     inspectMonaco
// } from "@/diagnostics/monacoProbe";

// import {
//     inspectReact
// } from "@/diagnostics/reactProbe";

// import {
//     inspectEditor
// } from "@/diagnostics/editorProbe";
import { installExtensionContextGuard } from "@/utils/extensionContext";
installExtensionContextGuard();

// import { inspectFiber } from "@/diagnostics/fiber";
import { extractProblem } from "./extractor";
import { MessageType } from "@/types/messages";
import { debugLog } from "./debug";
import { LOGS } from "@/constants/messages";
import { PublishMessage } from "@/shared/messages/publish";
import { LeetCodeEditorAdapter } from "./editor";
import { ShareManager } from "./share";
import { getPendingMarkdown, clearPendingMarkdown } from "@/shared/storage/publish";

debugLog(LOGS.CONTENT_LOADED);
// inspectRuntime();

// inspectMonaco();

// inspectReact();

// inspectEditor();
// inspectFiber();
const { problem, report } = extractProblem();
console.log({ problem, report });

const adapter = new LeetCodeEditorAdapter();
const manager = new ShareManager();
console.log(
    "Editor (initial check):",
    adapter.detector.findEditor()
);

// Dynamic observer to catch the editor as soon as LeetCode loads/injects it into the DOM
const observer = new MutationObserver(() => {
    const editor = adapter.detector.findEditor();
    if (editor) {
        console.log("Editor detected in DOM dynamically:", editor);
        observer.disconnect(); // Stop observing once found
    }
});

if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
} else {
    window.addEventListener("DOMContentLoaded", () => {
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    switch (request.type) {
        case MessageType.EXTRACT_PROBLEM: {
            debugLog(LOGS.EXTRACTION_STARTED);
            const { problem, report } = extractProblem();
            debugLog(LOGS.EXTRACTION_COMPLETED, { problem, report });
            sendResponse({ problem, report });
            break;
        }
        case PublishMessage.PUBLISH_MARKDOWN: {
            console.log("Publish request received.");
            console.log("Received markdown");
            (async () => {
                try {
                    await manager.openPostEditor();
                    sendResponse({
                        success: true,
                    });
                } catch (error) {
                    sendResponse({
                        success: false,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Unknown",
                    });
                }
            })();
            return true;
        }
    }
});

/**
 * Creates and displays a premium, modern success toast on the page.
 */
function showSuccessToast(message: string) {
    const styleId = "codepost-toast-styles";
    if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            .codepost-toast {
                position: fixed;
                bottom: 24px;
                right: 24px;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #f8fafc;
                padding: 14px 20px;
                border-radius: 12px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                gap: 12px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                font-size: 14px;
                font-weight: 500;
                z-index: 999999;
                transform: translateY(40px) scale(0.95);
                opacity: 0;
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
            }
            .codepost-toast.show {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            .codepost-toast-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 22px;
                height: 22px;
                background: linear-gradient(135deg, #34d399 0%, #059669 100%);
                color: white;
                border-radius: 50%;
                font-size: 12px;
                box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    const toast = document.createElement("div");
    toast.className = "codepost-toast";
    
    const icon = document.createElement("div");
    icon.className = "codepost-toast-icon";
    icon.innerHTML = "✓";
    
    const text = document.createElement("span");
    text.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);
    
    // Force reflow
    toast.offsetHeight;
    
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 3500);
}

let isInjecting = false;

/**
 * Checks if the URL matches the post-solution page and attempts to auto-inject the pending markdown.
 */
async function checkAndInject() {
    if (isInjecting) return;

    if (!window.location.href.includes("/post-solution")) {
        return;
    }

    let pendingMarkdown: string | undefined;
    try {
        pendingMarkdown = await getPendingMarkdown();
    } catch (e) {
        console.error("[CodePost] Failed to get pending markdown from session storage:", e);
        return;
    }

    if (!pendingMarkdown) {
        return;
    }

    isInjecting = true;

    try {
        console.log("[Content] Attempting Monaco API injection...");

        // Setup event handlers for main-world communication
        const handleSuccess = async () => {
            window.removeEventListener("codepost-injected-success", handleSuccess);
            window.removeEventListener("codepost-injected-failed", handleFailure);
            await clearPendingMarkdown();
            showSuccessToast("Solution markdown loaded!");
            isInjecting = false;
        };

        const handleFailure = () => {
            window.removeEventListener("codepost-injected-success", handleSuccess);
            window.removeEventListener("codepost-injected-failed", handleFailure);
            isInjecting = false; // Allow retry on next check
        };

        window.addEventListener("codepost-injected-success", handleSuccess);
        window.addEventListener("codepost-injected-failed", handleFailure);

        // Inject script into the main world to interact with Monaco Editor directly
        const script = document.createElement("script");
        script.textContent = `
            (function() {
                try {
                    if (window.monaco && window.monaco.editor) {
                        const models = window.monaco.editor.getModels();
                        if (models && models.length > 0) {
                            // Find markdown model or template model
                            let targetModel = models.find(m => {
                                const lang = (typeof m.getModeId === 'function' ? m.getModeId() : '') || 
                                             (typeof m.getLanguageId === 'function' ? m.getLanguageId() : '');
                                return lang === 'markdown';
                            });
                            
                            if (!targetModel) {
                                targetModel = models.find(m => m.getValue().includes('Describe your first thoughts'));
                            }
                            
                            if (!targetModel) {
                                targetModel = models[0];
                            }
                            
                            targetModel.setValue(${JSON.stringify(pendingMarkdown)});
                            window.dispatchEvent(new CustomEvent("codepost-injected-success"));
                            return;
                        }
                    }
                    window.dispatchEvent(new CustomEvent("codepost-injected-failed"));
                } catch (e) {
                    console.error("[CodePost] Injected script error:", e);
                    window.dispatchEvent(new CustomEvent("codepost-injected-failed"));
                }
            })();
        `;
        document.documentElement.appendChild(script);
        script.remove();
    } catch (err) {
        console.error("[Content] Injection error:", err);
        isInjecting = false;
    }
}

// Periodically check for post-solution pages and inject markdown if available
setInterval(checkAndInject, 1000);
checkAndInject();

