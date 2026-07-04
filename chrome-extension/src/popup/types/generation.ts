export type GenerationStatus = |"idle"|"generating"|"completed"|"failed";

export interface GenerationState{
    status:GenerationStatus;
    result:GeneratedSolution | null;
    error:string | null;
}

export interface GeneratedSolution {
    markdown:string;
    score?:number;
    metadata?:{
        generatedAt:number;
        model?: string;
    };
}

