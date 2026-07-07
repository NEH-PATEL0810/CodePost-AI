import { StorageKeys } from "@/shared/storageKeys";

export class PendingStore {
    async save(
        markdown: string,
        problem: string,
        language: string
    ): Promise<void> {
        await chrome.storage.session.set({
            [StorageKeys.PendingMarkdown]: markdown,
            [StorageKeys.PendingProblem]: problem,
            [StorageKeys.PendingLanguage]: language
        });
    }

    async load(): Promise<any> {
        return chrome.storage.session.get([
            StorageKeys.PendingMarkdown,
            StorageKeys.PendingProblem,
            StorageKeys.PendingLanguage
        ]);
    }

    async clear(): Promise<void> {
        await chrome.storage.session.remove([
            StorageKeys.PendingMarkdown,
            StorageKeys.PendingProblem,
            StorageKeys.PendingLanguage
        ]);
    }
}
