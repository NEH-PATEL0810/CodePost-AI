import type { ExtractionContext } from "./context";
import type { ProblemData } from "@/types/problem";
import { ExtractorRegistry } from "./registry";
import { validateProblem } from "@/core/validation/validator";
import { debugLog } from "@/content/debug";
import { extractCode } from "@/content/extractor/code";
import { validateExtraction } from "@/core/extraction/validator";

import type { ExtractionResponse } from "@/types/extraction";

export class ExtractionManager {
    extract(
        context: ExtractionContext
    ): ExtractionResponse {

        debugLog("Extraction Started");

        // Extract
        const title = ExtractorRegistry.title(context);
        const difficulty = ExtractorRegistry.difficulty(context);
        const description = ExtractorRegistry.description(context);
        const examples = ExtractorRegistry.examples(context);
        const constraints = ExtractorRegistry.constraints(context);
        const language = ExtractorRegistry.language(context);

        const problem: ProblemData = {
            title: title.value ?? "",
            difficulty: difficulty.value ?? "",
            description: description.value ?? "",
            examples: examples.value ?? [],
            constraints: constraints.value ?? [],
            language: language.value ?? "",
            code: extractCode(),
            url: context.url,
        };

        // Validate
        const validation = validateProblem(problem);

        const report = validateExtraction(problem);

        // Consolidated logging
        debugLog("Extraction Complete");
        console.log("ProblemData", problem);
        debugLog("Extraction Report", report);

        if (validation.errors.length > 0) {
            console.table(validation.errors);
        }

        return { problem, report };
    }
}