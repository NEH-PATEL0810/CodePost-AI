import type { CodeExtractionResult } from "./types";

export interface CodeStrategy {
    name: string;

    extract(): CodeExtractionResult;
}
