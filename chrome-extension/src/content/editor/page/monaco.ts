export class MonacoService {
    async setMarkdown(markdown: string) {
        const models = (window as any).monaco.editor.getModels();
        const model = models.find((m: any) =>
            m.getLanguageId() === "markdown"
        );

        if (!model)
            throw new Error("Markdown model not found");

        model.setValue(markdown);
    }
}
