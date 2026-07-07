import { PAGE_MESSAGES, RuntimeMessageType } from "../runtime/messages";

export class RuntimeMessenger {
    initialize() {
        window.addEventListener("message", event => {
            if (event.source !== window)
                return;

            if (
                event.data.type ===
                PAGE_MESSAGES.PONG
            ) {
                console.log("[Content] PONG Received");
            }

            if (
                event.data.type ===
                PAGE_MESSAGES.MODELS_FOUND
            ) {
                console.log(
                    "[Content] Monaco Models"
                );
                console.table(
                    event.data.models
                );
            }
        });
    }

    ping() {
        console.log("[Content] Sending PING");
        window.postMessage({
            source: "CODEPOST",
            type: RuntimeMessageType.PING
        }, "*");
    }

    discoverModels() {
        console.log(
            "[Content] Sending DISCOVER_MODELS"
        );
        window.postMessage({
            source: "CODEPOST",
            type: RuntimeMessageType.DISCOVER_MODELS
        }, "*");
    }

    startHeartbeat() {
        console.log("[Content] Starting Heartbeat");
        setInterval(() => {
            this.ping();
        }, 10000);
    }

    injectMarkdown(markdown: string) {
        console.log(
            "[Content] Sending INJECT_MARKDOWN"
        );
        window.postMessage({
            source: "CODEPOST",
            type: RuntimeMessageType.INJECT_MARKDOWN,
            markdown
        }, "*");
    }
}
