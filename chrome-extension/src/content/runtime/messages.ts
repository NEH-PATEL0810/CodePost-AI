import { RuntimeMessageType } from "@/shared/messageTypes";
export { RuntimeMessageType };

export interface RuntimeMessage {
    source: "CODEPOST";
    type: RuntimeMessageType;
    markdown?: string;
}

export const PAGE_MESSAGES = {
    PING: "PING",
    PONG: "PONG",
    SET_MARKDOWN: "SET_MARKDOWN",
    CHECK_MONACO: "CHECK_MONACO",
    MONACO_STATUS: "MONACO_STATUS",
    READY: "READY",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    DISCOVER_MODELS: "DISCOVER_MODELS",
    INJECT_MARKDOWN: "INJECT_MARKDOWN",
    MODELS_FOUND: "MODELS_FOUND"
} as const;
