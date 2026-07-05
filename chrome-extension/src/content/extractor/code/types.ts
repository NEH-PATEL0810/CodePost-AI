export interface CodeExtractionResult {
    success: boolean;
    code: string;
    lineCount: number;
    strategy: "codemirror";
}
