import type { ExtractionContext } from "./context";

import type { ProblemData } from "@/types/problem";
import { ExtractorRegistry } from "./registry";

export class ExtractionManager {
    extract(
        context: ExtractionContext
    ): ProblemData {

        const title = ExtractorRegistry.title(context);
        const difficulty = ExtractorRegistry.difficulty(context);
        const description = ExtractorRegistry.description(context);
        const examples = ExtractorRegistry.examples(context);
        const constraints = ExtractorRegistry.constraints(context);
        const language = ExtractorRegistry.language(context);
        return {
            title: title.value ?? "",
            difficulty:difficulty.value ?? "",
            description: description.value??"",
            examples: examples.value ?? [],
            constraints:constraints.value?? [],
            language: language.value ?? "",
            code: "",
            url: context.url,
        };
    }
}