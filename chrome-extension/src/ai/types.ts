export interface GeneratedSolution {
    markdown: string;
    score?: number;
    metadata?: {
        generatedAt?: number;
        model?: string;
        provider: string;
        version: string;
    };
}
