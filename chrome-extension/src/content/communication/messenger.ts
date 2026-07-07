import { PAGE_MESSAGES } from "@/page/messages";

export class RuntimeMessenger {
    initialize() {
        window.addEventListener("message", event => {
            if (event.source !== window)
                return;

            const { type } = event.data;

            if (type !== PAGE_MESSAGES.PONG)
                return;

            console.log("[Content] PONG Received");
        });
    }

    ping() {
        console.log("[Content] Sending PING");
        window.postMessage({
            type: PAGE_MESSAGES.PING,
        }, "*");
    }
}
