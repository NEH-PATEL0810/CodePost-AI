import type { ExtractionContext } from "./context";
import type { ProblemData } from "@/types/problem";
import { ExtractorRegistry } from "./registry";
import { validateProblem } from "@/core/validation/validator";
import { extractionScore } from "@/core/validation/score";
import { isReadyForGeneration } from "@/core/validation/readiness";
import { debugLog } from "@/content/debug";
import type { ExtrqactionDiagnostics } from "@/core/validation/diagnostics";

export class ExtractionManager {
    extract(
        context: ExtractionContext
    ): ProblemData {

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
            code: "",
            url: context.url,
        };

        // Validate
        const validation = validateProblem(problem);

        // Diagnostics
        const diagnostics: ExtrqactionDiagnostics = {
            title: title.success,
            difficulty: difficulty.success,
            description: description.success,
            examples: examples.success,
            constraints: constraints.success,
            language: language.success,
            code: false,
        };

        // Score
        const score = extractionScore(problem);

        // Ready
        const ready = isReadyForGeneration(problem);

        // Consolidated logging
        debugLog("Extraction Complete");
        console.log("ProblemData", problem);
        console.log(`Extraction Score: ${score} / 7`);
        console.log(`Ready For Generation: ${ready}`);
        console.log("Diagnostics", diagnostics);

        if (validation.errors.length > 0) {
            console.table(validation.errors);
        }

        return problem;
    }
}