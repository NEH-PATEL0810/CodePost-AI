import { installExtensionContextGuard } from "@/utils/extensionContext";
installExtensionContextGuard();

import { RuntimeMessenger } from "./communication/messenger";
import { NavigationBridge } from "./bridge/manager";
import { extractProblem } from "./extractor";
import { MessageType } from "@/types/messages";
import { debugLog } from "./debug";
import { LOGS } from "@/constants/messages";
import { PublishMessage } from "@/shared/messages/publish";
import { ShareManager } from "./share";

// 1. Initialize ping/pong communication
const messenger = new RuntimeMessenger();
messenger.initialize();

setTimeout(() => {
    messenger.ping();
}, 1500); // 1.5s delay to guarantee the script is loaded first

// 2. Initialize Monaco detection bridge (also handles page-bridge injection)
const bridge = new NavigationBridge();
bridge.initialize();

// 4. Initialize ShareManager for redirecting to publish
const manager = new ShareManager();

// 5. Register message listeners to resolve popup connection errors
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    switch (request.type) {
        case MessageType.EXTRACT_PROBLEM: {
            debugLog(LOGS.EXTRACTION_STARTED);
            const { problem, report } = extractProblem();
            debugLog(LOGS.EXTRACTION_COMPLETED);
            sendResponse({
                problem,
                report,
            });
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
        default:
            return false;
    }
});
