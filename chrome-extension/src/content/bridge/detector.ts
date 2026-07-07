import { PAGE_MESSAGES, RuntimeMessageType } from "../runtime/messages";

export class RuntimeDetector {
    checkMonaco(): Promise<boolean> {
        return new Promise(resolve => {
            const listener = (event: MessageEvent) => {
                if (event.source !== window)
                    return;

                if (event.data.type !== PAGE_MESSAGES.MONACO_STATUS)
                    return;

                window.removeEventListener(
                    "message",
                    listener
                );

                resolve(event.data.available);
            };

            window.addEventListener(
                "message",
                listener
            );

            console.log("[Content] Sending CHECK_MONACO");

            window.postMessage({
                source: "CODEPOST",
                type: RuntimeMessageType.CHECK_MONACO
            }, "*");
        });
    }
}
