import { PAGE_MESSAGES, RuntimeMessageType } from "./messages";

export class RuntimeMessenger {
    static sendReady(): void {
        window.postMessage({
            source: "CODEPOST",
            type: PAGE_MESSAGES.READY
        }, "*");
    }

    static sendPong(): void {
        window.postMessage({
            source: "CODEPOST",
            type: PAGE_MESSAGES.PONG
        }, "*");
    }

    static sendMonacoStatus(available: boolean): void {
        window.postMessage({
            source: "CODEPOST",
            type: PAGE_MESSAGES.MONACO_STATUS,
            available
        }, "*");
    }

    static sendModelsFound(models: any[]): void {
        window.postMessage({
            source: "CODEPOST",
            type: PAGE_MESSAGES.MODELS_FOUND,
            models
        }, "*");
    }

    static sendResponse(data: any, requestId?: string): void {
        window.postMessage({
            source: "CODEPOST",
            type: RuntimeMessageType.RESPONSE,
            requestId,
            data
        }, "*");
    }
}
