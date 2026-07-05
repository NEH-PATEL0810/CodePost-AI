export interface ExtractionReport {

    score: number;

    maxScore: number;

    readyForGeneration: boolean;

    diagnostics: {

        title: boolean;

        difficulty: boolean;

        description: boolean;

        examples: boolean;

        constraints: boolean;

        language: boolean;

        code: boolean;

    };

}