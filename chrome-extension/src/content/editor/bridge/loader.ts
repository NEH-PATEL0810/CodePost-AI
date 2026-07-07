import { SESSION_KEYS } from "@/shared/storage/publish";

export class BridgeLoader {
    async load(): Promise<Record<string, any>> {
        console.log("[Bridge] Loading markdown");
        const result = await chrome.storage.session.get([
            SESSION_KEYS.PENDING_MARKDOWN,
            SESSION_KEYS.PENDING_TITLE,
            SESSION_KEYS.PENDING_PROBLEM,
        ]);
        return result;
    }
}
