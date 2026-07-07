import { RuntimeRouter } from "./router";
import { RuntimeMessageType } from "./messages";
import type { RuntimeMessage } from "./messages";
import { MonacoDetector } from "./detector";
import { MonacoDiscovery } from "./modelDiscovery";
import { MonacoSelector } from "./modelSelector";
import { MarkdownWriter } from "./writer";
import { RuntimeGuard } from "./guard";

const detector = new MonacoDetector();
const discovery = new MonacoDiscovery();
const selector = new MonacoSelector();
const writer = new MarkdownWriter();
const guard = new RuntimeGuard();
const router = new RuntimeRouter();

console.log("[Runtime] Listening...");

async function injectMarkdown(markdown: string): Promise<boolean> {
    console.log("[Runtime] Injection Requested");
    console.log("[Runtime] Checking URL");

    if (!guard.isSolutionPage()) {
        console.log("[Runtime] Injection Blocked");
        return false;
    }

    console.log("[Runtime] Solution Page Verified");
    console.log("[Runtime] Discovering Models");

    await discovery.discover();

    const rawModels = (window as any).monaco?.editor?.getModels() || [];

    console.log("[Runtime] Selecting Markdown Model");
    const model = selector.selectMarkdownModel(rawModels);

    if (!model) {
        console.log("[Runtime] No Markdown Model");
        return false;
    }

    console.log("[Runtime] Writing Markdown");
    const result = writer.write(model, markdown);
    console.log("[Runtime] Done");
    return result;
}

// Send ready message
window.postMessage({ type: "READY" }, "*");

window.addEventListener("message", async (event) => {
    if (event.source !== window)
        return;

    const action = router.route(event.data as RuntimeMessage);
    if (!action) return;

    switch (action) {
        case RuntimeMessageType.PING: {
            console.log("[Runtime] PING Received");
            window.postMessage({ type: "PONG" }, "*");
            break;
        }

        case RuntimeMessageType.CHECK_MONACO: {
            console.log("[Runtime] Checking Monaco...");
            window.postMessage({
                type: "MONACO_STATUS",
                available: detector.isAvailable()
            }, "*");
            break;
        }

        case RuntimeMessageType.DISCOVER_MODELS: {
            console.log("[Runtime] Discovering Monaco Models...");
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

            window.postMessage({
                type: "MODELS_FOUND",
                models
            }, "*");
            break;
        }

        case RuntimeMessageType.INJECT_MARKDOWN: {
            console.log("[Runtime] Injection Request Received");
            const markdown = event.data.markdown;
            const success = await injectMarkdown(markdown);
            console.log("[Runtime] Injection Status:", success);
            break;
        }
    }
});
