import { MonacoDiscovery } from "../modelDiscovery";
import { MonacoSelector } from "../modelSelector";
import { MarkdownWriter } from "../writer";
import { RuntimeGuard } from "../guard";

const discovery = new MonacoDiscovery();
const selector = new MonacoSelector();
const writer = new MarkdownWriter();
const guard = new RuntimeGuard();

export async function injectionHandler(
    markdown: string
): Promise<boolean> {
    console.log("[Handler] Injection");

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
