import { MonacoDiscovery } from "../modelDiscovery";
import { MonacoSelector } from "../modelSelector";
import { RuntimeMessenger } from "../messenger";

const discovery = new MonacoDiscovery();
const selector = new MonacoSelector();

export async function discoveryHandler(): Promise<void> {
    console.log("[Handler] Discover Models");

    const models = await discovery.discover();
    const rawModels = (window as any).monaco?.editor?.getModels() || [];
    const selectedModel = selector.selectMarkdownModel(rawModels);

    if (!selectedModel) {
        console.log("[Runtime] No Markdown Model.");
        return;
    }

    console.log("[Runtime] Markdown Model Selected");
    console.table([{
        language: selectedModel.getLanguageId(),
        uri: selectedModel.uri.toString(),
        lineCount: selectedModel.getLineCount(),
        preview: selectedModel.getValue().substring(0, 80)
    }]);

    RuntimeMessenger.sendModelsFound(models);
}
