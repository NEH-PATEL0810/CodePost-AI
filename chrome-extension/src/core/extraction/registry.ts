import { extractTitle } from "@/content/extractors/title";
import { extractDifficulty } from "@/content/extractors/difficulty";


export const ExtractorRegistry = {
    title:extractTitle,
    difficulty:extractDifficulty,

};