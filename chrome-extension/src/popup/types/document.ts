import type { ProblemData } from "@/core/types/problem";

export interface SolutionDocument {

    problem: ProblemData;

    originalMarkdown: string;

    currentMarkdown: string;

    generatedAt: Date;

    isEdited: boolean;

    isGenerating: boolean;

    score?: number;

}
