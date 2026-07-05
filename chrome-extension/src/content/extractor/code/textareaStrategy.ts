import type { CodeStrategy } from "./strategies";
import type { CodeExtractionResult } from "./types";

export class TextareaStrategy implements CodeStrategy {

    name = "textarea";

    extract(): CodeExtractionResult {

        const textarea =
            document.querySelector(
                "textarea[aria-label='Code editor']"
            ) as HTMLTextAreaElement | null;

        if (!textarea) {

            return {
                success: false,
                code: "",
                lineCount: 0,
                strategy: this.name,
            };

        }

        return {

            success: true,

            code: textarea.value,

            lineCount: textarea.value.split("\n").length,

            strategy: this.name,

        };

    }

}
