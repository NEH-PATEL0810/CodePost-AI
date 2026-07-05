import { regenerateDocumentation } from "../services/regenerate";
import { useDocument } from "../context/DocumentContext";

export function useRegenerate() {

    const {

        document,

        setDocument,

    } = useDocument();

    async function regenerate() {

        if (!document) return;

        setDocument({

            ...document,

            isGenerating: true,

        });

        try {

            const result =
                await regenerateDocumentation(
                    document.problem
                );

            const newDate = new Date();
            setDocument({

                ...document,

                originalMarkdown: result.markdown,

                currentMarkdown: result.markdown,

                generatedAt: newDate,

                isEdited: false,

                isGenerating: false,

            });

            console.log("Regenerated", newDate);

        } catch (error) {

            setDocument({

                ...document,

                isGenerating: false,

            });

            throw error;

        }

    }

    return {

        regenerate,

    };

}
