import { PopupMessageType } from "@/shared/popupMessages";
import { RuntimeMessageType } from "@/shared/messageTypes";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (!message || message.source !== "CODEPOST") {
        return;
    }

    if (message.type !== PopupMessageType.REQUEST) {
        return;
    }

    console.log("[PopupBridge]\nPopup Request Received");

    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const listener = (event: MessageEvent) => {
        if (event.source !== window)
            return;

        const response = event.data;
        if (
            !response ||
            response.source !== "CODEPOST" ||
            response.type !== RuntimeMessageType.RESPONSE
        ) {
            return;
        }

        // Match the request ID
        if (response.requestId === requestId) {
            window.removeEventListener("message", listener);
            console.log("[PopupBridge]\nReturning Response");
            sendResponse(response.data);
        }
    };

    window.addEventListener("message", listener);

    // Forward request to page runtime
    window.postMessage({
        source: "CODEPOST",
        type: RuntimeMessageType.REQUEST,
        requestId,
        payload: message.payload
    }, "*");

    return true; // Keep message channel open for async response
});
