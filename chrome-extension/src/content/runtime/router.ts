import { RuntimeMessageType } from "./messages";
import type { RuntimeMessage } from "./messages";

export class RuntimeRouter {
    route(
        message: RuntimeMessage
    ) {
        console.log(
            "[Router] Received:",
            message.type
        );

        switch (message.type) {
            case RuntimeMessageType.PING:
                return RuntimeMessageType.PING;

            case RuntimeMessageType.CHECK_MONACO:
                return RuntimeMessageType.CHECK_MONACO;

            case RuntimeMessageType.DISCOVER_MODELS:
                return RuntimeMessageType.DISCOVER_MODELS;

            case RuntimeMessageType.INJECT_MARKDOWN:
                return RuntimeMessageType.INJECT_MARKDOWN;

            default:
                console.warn(
                    "[Router] Unknown Message"
                );
                return null;
        }
    }
}
