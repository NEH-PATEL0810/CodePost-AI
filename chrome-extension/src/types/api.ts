import type { ProblemData } from "./problem";

export interface GenerateRequest{
    problem: ProblemData;
}

export interface GenerateResponse{
    markdown: string;
    score:number;
}