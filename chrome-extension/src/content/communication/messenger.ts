import { PAGE_MESSAGES } from "@/page/messages";

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

            type: PAGE_MESSAGES.PING

        });

    }

    discoverModels() {

        console.log(
            "[Content] Sending DISCOVER_MODELS"
        );

        window.postMessage({

            type:
                PAGE_MESSAGES.DISCOVER_MODELS

        });

    }

}

