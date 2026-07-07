import { useDocument } from "../context/DocumentContext";
import { useCurrentTab } from "./useCurrenttab";
import { PublishService } from "../publish/publishService";

export function usePublish() {
    const { document } = useDocument();
    const tab = useCurrentTab();
    const publishService = new PublishService();

    async function publish() {
        if (!document || !tab?.id)
            throw new Error("No active document or tab found.");

        const match = document.problem.url.match(/\/problems\/([^/]+)/);
        const slug = match ? match[1] : "";

        console.log("Publishing...");
        await publishService.publish(
            document.currentMarkdown,
            slug,
            document.problem.title,
            document.problem.language || "c++"
        );

        return { success: true };
    }

    return {
        publish,
    };
}
