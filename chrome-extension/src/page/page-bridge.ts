import { PAGE_MESSAGES } from "./messages";
import { MonacoDetector } from "./monaco/detector";

const detector = new MonacoDetector();

console.log("[Runtime] Listening...");

window.addEventListener("message", event => {

    if (event.source !== window)
        return;

    const { type } = event.data;

    if (type === PAGE_MESSAGES.PING) {

        console.log("[Runtime] PING Received");

        window.postMessage({

            type: PAGE_MESSAGES.PONG

        });

        return;

    }

    if (type === PAGE_MESSAGES.CHECK_MONACO) {

        console.log("[Runtime] Checking Monaco...");

        window.postMessage({

            type: PAGE_MESSAGES.MONACO_STATUS,

            available: detector.isAvailable()

        });

        return;

    }

});
