import type { ProblemData } from "@/types/problem";

export function validateProblem(
    data: ProblemData
): boolean {
    if (data.description.length < 20) {
        return false;
    }
    
    return true;
}