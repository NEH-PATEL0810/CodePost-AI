import type { ProblemData } from "@/types/problem";

export interface ValidationResult{
    valid:boolean;
    errors:string[];
}
export function validateProblem(
    problem:ProblemData
): ValidationResult {
   const errors : string[] =[];
   if(!problem.title) errors.push("missing title");
    if(!problem.difficulty) errors.push("Missing difficulty");
    if(!problem.description) errors.push("Missing description");
    return {
        valid: errors.length === 0,
        errors,
    };
   
}