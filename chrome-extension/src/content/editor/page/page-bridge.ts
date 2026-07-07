import { PAGE_MESSAGES } from "./messages";
import { MonacoService } from "./monaco";

const monaco = new MonacoService();

console.log("[CodePost Bridge] Loaded");

window.postMessage(
    {
        type: PAGE_MESSAGES.READY,
    },
    "*"
);

window.addEventListener("message", async (event) => {
    if (event.source !== window)
        return;

    if (event.data.type !== PAGE_MESSAGES.SET_MARKDOWN)
        return;

    console.log("[Bridge] Markdown Received");

    try {
        await monaco.setMarkdown(event.data.markdown);
        window.postMessage(
            {
                type: PAGE_MESSAGES.SUCCESS,
            },
            "*"
        );
    } catch (err) {
        console.error(err);
        window.postMessage(
            {
                type: PAGE_MESSAGES.ERROR,
            },
            "*"
        );
    }
});
