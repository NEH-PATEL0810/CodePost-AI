import type { ProblemData } from "../types/problem";

export function extractionScore(
    problem:ProblemData
):number{
    let score = 0;
    if(problem.title) score++;
    if(problem.difficulty) score++;
    if(problem.description) score++;
    if(problem.examples.length) score++;
    if(problem.constraints.length) score++;
    if(problem.language) score++;
    if(problem.code) score++;
    return score;
}