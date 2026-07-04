import type { ExtractionContext } from "./context";

import type { ProblemData } from "@/types/problem";
import { ExtractorRegistry } from "./registry";

export class ExtractionManager {
    extract(
        context: ExtractionContext
    ): ProblemData {

        const title = ExtractorRegistry.title(context);
        const difficulty = ExtractorRegistry.difficulty(context);
        return {
            title: title.value ?? "",
            difficulty:difficulty.value ?? "",
            description: "",
            examples: [],
            constraints: [],
            language: "",
            code: "",
            url: context.url,
        };
    }
}