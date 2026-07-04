import type { ProblemData } from "@/core/types/problem";
import type { GenerateRequest } from "../types";

export function mapProblemToGenerateRequest(
    problem: ProblemData
): GenerateRequest {
    return {
        title: problem.title,
        difficulty: problem.difficulty,
        description: problem.description,
        examples: problem.examples,
        constraints: problem.constraints,
        language: problem.language,
        code: problem.code,
        url: problem.url,
    };
}