import { extractTitle } from "@/content/extractors/title";
import { extractDifficulty } from "@/content/extractors/difficulty";
import { extractDescription } from "@/content/extractors/description";
import { extractExamples } from "@/content/extractors/examples";
import { extractConstraints } from "@/content/extractors/constraints";

export const ExtractorRegistry = {
    title:extractTitle,
    difficulty:extractDifficulty,
    description:extractDescription,
    examples:extractExamples,
    constraints:extractConstraints,

};