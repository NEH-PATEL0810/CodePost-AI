import { generateDocumentation } from "./generation";
import type { ProblemData } from "@/core/types/problem";

export async function regenerateDocumentation(
    problem: ProblemData
) {
    return await generateDocumentation(problem);
}
