import { RuntimeRouter } from "./router";
import { RuntimeMessageType } from "./messages";
import type { RuntimeMessage } from "./messages";
import { RuntimeMessenger } from "./messenger";

import { pingHandler } from "./handlers/pingHandler";
import { monacoHandler } from "./handlers/monacoHandler";
import { discoveryHandler } from "./handlers/discoveryHandler";
import { injectionHandler } from "./handlers/injectionHandler";
import { RequestHandler } from "./handlers/requestHandler";

const router = new RuntimeRouter();
const requestHandler = new RequestHandler();

console.log("[Runtime] Listening...");

// Send ready message
RuntimeMessenger.sendReady();

window.addEventListener("message", async (event) => {
    if (event.source !== window)
        return;

    const message = event.data;
    if (
        !message ||
        message.source !== "CODEPOST"
    ) {
        return;
    }

    const action = router.route(message as RuntimeMessage);
    if (!action) return;

    switch (action) {
        case RuntimeMessageType.READY:
        case RuntimeMessageType.PONG:
        case RuntimeMessageType.MONACO_STATUS:
        case RuntimeMessageType.MODELS_FOUND:
        case RuntimeMessageType.RESPONSE:
            // Infrastructure messages, handled by the content script side
            break;

        case RuntimeMessageType.PING: {
            await pingHandler();
            break;
        }

        case RuntimeMessageType.CHECK_MONACO: {
            await monacoHandler();
            break;
        }

        case RuntimeMessageType.DISCOVER_MODELS: {
            await discoveryHandler();
            break;
        }

        case RuntimeMessageType.INJECT_MARKDOWN: {
            const markdown = message.markdown || "";
            const success = await injectionHandler(markdown);
            console.log("[Runtime] Injection Status:", success);
            RuntimeMessenger.sendInjectionStatus(success);
            break;
        }

        case RuntimeMessageType.REQUEST: {
            const data = await requestHandler.handle();
            RuntimeMessenger.sendResponse(data, message.requestId);
            break;
        }
    }
});
