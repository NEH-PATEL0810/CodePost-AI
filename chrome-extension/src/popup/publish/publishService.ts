import { PendingStore } from "./pendingStore";

export class PublishService {
    private pendingStore = new PendingStore();

    async publish(
        markdown: string,
        slug: string,
        title: string,
        language: string
    ): Promise<void> {
        console.log("[Publish] Saving Pending Documentation");

        await this.pendingStore.save(
            markdown,
            title,
            language
        );

        console.log("[Publish] Pending Saved");
        console.log("[Publish] Navigating");

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        if (!tab || !tab.id) {
            throw new Error("No active tab found");
        }

        await chrome.tabs.update(
            tab.id,
            {
                url: `https://leetcode.com/problems/${slug}/post-solution/`
            }
        );

        console.log("[Publish]\nPublish Complete");
    }
}
