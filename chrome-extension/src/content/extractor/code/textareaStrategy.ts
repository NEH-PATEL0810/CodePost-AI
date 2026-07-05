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
                strategy: this.name,
            };

        }

        return {

            success: true,

            code: textarea.value,

            strategy: this.name,

        };

    }

}
