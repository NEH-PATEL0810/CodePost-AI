import { RuntimeMessageType } from "./messages";
import type { RuntimeMessage } from "./messages";

export class RuntimeRouter {
    route(
        message: RuntimeMessage
    ) {
        if (!message.type) {
            console.warn(
                "[Router] Missing message type"
            );
            return null;
        }

        console.log(
            "[Router] Received:",
            message.type
        );

        switch (message.type) {
            case RuntimeMessageType.READY:
                return RuntimeMessageType.READY;

            case RuntimeMessageType.PING:
                return RuntimeMessageType.PING;

            case RuntimeMessageType.PONG:
                return RuntimeMessageType.PONG;

            case RuntimeMessageType.CHECK_MONACO:
                return RuntimeMessageType.CHECK_MONACO;

            case RuntimeMessageType.MONACO_STATUS:
                return RuntimeMessageType.MONACO_STATUS;

            case RuntimeMessageType.DISCOVER_MODELS:
                return RuntimeMessageType.DISCOVER_MODELS;

            case RuntimeMessageType.MODELS_FOUND:
                return RuntimeMessageType.MODELS_FOUND;

            case RuntimeMessageType.INJECT_MARKDOWN:
                return RuntimeMessageType.INJECT_MARKDOWN;

            case RuntimeMessageType.REQUEST:
                return RuntimeMessageType.REQUEST;

            case RuntimeMessageType.RESPONSE:
                return RuntimeMessageType.RESPONSE;

            default:
                console.warn(
                    "[Router] Unknown Message"
                );
                return null;
        }
    }
}
