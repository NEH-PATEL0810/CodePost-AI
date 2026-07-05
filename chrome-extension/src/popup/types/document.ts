export interface SolutionDocument {

    originalMarkdown: string;

    currentMarkdown: string;

    generatedAt: Date;

    isEdited: boolean;

    score?: number;

}
