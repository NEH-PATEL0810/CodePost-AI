import { extractTitle } from "@/content/extractors/title";
import { extractDifficulty } from "@/content/extractors/difficulty";
import { extractDescription } from "@/content/extractors/description";
import { extractExamples } from "@/content/extractors/examples";
import { extractConstraints } from "@/content/extractors/constraints";
import { extractLanguage } from "@/content/extractors/language";
import type { Extractor } from "./interfaces";

export interface ProblemExtractorRegistry {
    title: Extractor<string>;
    difficulty: Extractor<string>;
    description: Extractor<string>;
    examples: Extractor<string[]>;
    constraints: Extractor<string[]>;
    language: Extractor<string>;
}

export const ExtractorRegistry: ProblemExtractorRegistry = {
    title: extractTitle,
    difficulty: extractDifficulty,
    description: extractDescription,
    examples: extractExamples,
    constraints: extractConstraints,
    language: extractLanguage,
};