export interface MonacoModelInfo {

    id: number;

    language: string;

    uri: string;

    lineCount: number;

    valuePreview: string;

}

export class MonacoDiscovery {

    async discover(): Promise<MonacoModelInfo[]> {

        const monaco = (window as any).monaco;

        if (!monaco)
            return [];

        for (let i = 0; i < 30; i++) {

            const models = monaco.editor.getModels();

            if (models.length > 0) {

                console.log(
                    "[Runtime] Models Found:",
                    models.length
                );

                return models.map((model: any, index: number) => ({

                    id: index,

                    language: model.getLanguageId(),

                    uri: model.uri?.toString(),

                    lineCount: model.getLineCount(),

                    valuePreview:
                        model.getValue().substring(0, 80)

                }));
            }

            await new Promise(resolve =>
                setTimeout(resolve, 200)
            );
        }

        console.log(
            "[Runtime] No Monaco models found."
        );

        return [];
    }

}
