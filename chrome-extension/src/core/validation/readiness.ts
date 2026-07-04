import type { ProblemData } from "../types/problem";

export function isReadyForGeneration(
    problem:ProblemData
):boolean {
    return(
        problem.title.length > 0 &&
        problem.description.length >0 &&
        problem.language.length > 0
    )
}