export class MonacoEditor {
    async wait(timeout = 15000): Promise<HTMLTextAreaElement> {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const editor = document.querySelector(
                ".monaco-editor textarea"
            ) as HTMLTextAreaElement | null;

            if (editor) {
                console.log("[Monaco] Ready.");
                return editor;
            }

            await new Promise(r => setTimeout(r, 250));
        }

        throw new Error("Monaco editor not found.");
    }

    focus(editor: HTMLTextAreaElement) {
        editor.focus();
        editor.dispatchEvent(
            new FocusEvent("focus", { bubbles: true })
        );
        console.log("[Monaco] Focused.");
    }

    clear(editor: HTMLTextAreaElement) {
        editor.focus();
        document.execCommand("selectAll");
        document.execCommand("delete");
        console.log("[Monaco] Cleared.");
    }

    insert(
        editor: HTMLTextAreaElement,
        markdown: string
    ) {
        editor.focus();
        document.execCommand(
            "insertText",
            false,
            markdown
        );
        console.log("[Monaco] Inserted.");
    }

    verify(markdown: string) {
        return document.body.innerText.includes(
            markdown.substring(0, 80)
        );
    }
}
