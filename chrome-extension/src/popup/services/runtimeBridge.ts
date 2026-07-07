export class RuntimeBridge {
    async send(message: any): Promise<any> {
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        const activeTab = tabs[0];
        if (!activeTab || activeTab.id === undefined) {
            throw new Error("No active tab found");
        }
        return chrome.tabs.sendMessage(activeTab.id, message);
    }
}
