export class MonacoSelector {
    selectMarkdownModel(
        models: any[]
    ) {
        console.log(
            "[Selector] Selecting Markdown Model..."
        );

        if (!models.length) {
            console.log(
                "[Selector] No models found."
            );
            return null;
        }

        //--------------------------------------------------
        // Rule 1
        //--------------------------------------------------
        const markdownModel = models.find(model => {
            try {
                return model.getLanguageId() === "markdown";
            } catch {
                return false;
            }
        });

        if (markdownModel) {
            console.log(
                "[Selector] Found markdown model."
            );
            return markdownModel;
        }

        //--------------------------------------------------
        // Rule 2
        //--------------------------------------------------
        const uriModel = models.find(model => {
            try {
                return model
                    .uri
                    ?.toString()
                    .includes("markdown");
            } catch {
                return false;
            }
        });

        if (uriModel) {
            console.log(
                "[Selector] Selected by URI."
            );
            return uriModel;
        }

        //--------------------------------------------------
        // Rule 3
        //--------------------------------------------------
        const contentModel = models.find(model => {
            try {
                const value = model.getValue();
                return value.includes("# Intuition");
            } catch {
                return false;
            }
        });

        if (contentModel) {
            console.log(
                "[Selector] Selected by content."
            );
            return contentModel;
        }

        //--------------------------------------------------
        // Rule 4
        //--------------------------------------------------
        console.log(
            "[Selector] Falling back to first model."
        );
        return models[0];
    }
}
