import type { ProblemData } from "@/types/problem";
import type { ExtractionReport } from "./report";

export function validateExtraction(
    problem: ProblemData
): ExtractionReport {

    const diagnostics = {
        title: !!problem.title,
        difficulty: !!problem.difficulty,
        description: !!problem.description,
        examples: problem.examples.length > 0,
        constraints: problem.constraints.length > 0,
        language: !!problem.language,
        code: !!problem.code,
    };
    const score =
        Object.values(diagnostics)
            .filter(Boolean)
            .length;

    return {

        score,
        maxScore: 7,
        readyForGeneration:
            diagnostics.title &&
            diagnostics.description &&
            diagnostics.language &&
            diagnostics.code,
        diagnostics,

    };

}