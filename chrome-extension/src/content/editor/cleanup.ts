export class Cleanup {
    async clear(): Promise<void> {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.session) {
            await chrome.storage.session.remove([
                "pending_markdown",
                "pending_title",
                "pending_problem",
            ]);
            console.log("[Bridge] Session storage cleared.");
        }
    }
}
