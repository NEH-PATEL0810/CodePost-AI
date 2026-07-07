import { PAGE_MESSAGES } from "../page/messages";

export class BridgeReady {
    wait(): Promise<void> {
        return new Promise(resolve => {
            const handler = (event: MessageEvent) => {
                if (event.source !== window)
                    return;

                if (event.data.type !== PAGE_MESSAGES.READY)
                    return;

                window.removeEventListener(
                    "message",
                    handler
                );

                resolve();
            };

            window.addEventListener(
                "message",
                handler
            );
        });
    }
}
