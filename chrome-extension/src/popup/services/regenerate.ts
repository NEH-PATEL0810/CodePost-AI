import { generateDocumentation } from "./generation";
import type { ProblemData } from "@/core/types/problem";

export async function regenerateDocumentation(
    problem: ProblemData,
    onProgress?: (msg: string) => void
) {
    return await generateDocumentation(problem, onProgress);
}
