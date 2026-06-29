import type {ProblemData} from "./problem.ts";

export interface GenerateRequest{
    problem: ProblemData;
}

export interface GenerateResponse{
    markdown: string;
    score:number;
}