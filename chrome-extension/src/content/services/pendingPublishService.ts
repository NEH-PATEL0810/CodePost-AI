import { StorageKeys } from "@/shared/storageKeys";

export class PendingPublishService {
    async getPendingMarkdown(): Promise<any> {
        return chrome.storage.session.get([
            StorageKeys.PendingMarkdown,
            StorageKeys.PendingProblem,
            StorageKeys.PendingLanguage
        ]);
    }

    async clearPendingMarkdown(): Promise<void> {
        await chrome.storage.session.remove([
            StorageKeys.PendingMarkdown,
            StorageKeys.PendingProblem,
            StorageKeys.PendingLanguage
        ]);
    }
}
