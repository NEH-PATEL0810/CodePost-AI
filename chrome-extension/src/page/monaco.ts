export class MonacoService {
    getModel() {
        const models = (window as any).monaco.editor.getModels();
        return models.find((model: any) =>
            model.getLanguageId() === "markdown"
        );
    }

    setMarkdown(markdown: string) {
        const model = this.getModel();
        if (!model) {
            console.error("[Bridge] Markdown model not found");
            return false;
        }
        model.setValue(markdown);
        return true;
    }
}
