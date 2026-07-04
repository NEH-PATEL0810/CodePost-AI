import { queryRequired } from "../dom/query";
import { SELECTORS } from "../selectors";
import  { ExtractionError } from "../errors";
import {debugLog} from "../debug";
import { cleanText } from "../parser";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";



export const extractDifficulty: Extractor<string> = (
    context
): ExtractionResult<string> => {
    try {
        const element = queryRequired(
            SELECTORS.DIFFICULTY,
            ExtractionError.DIFFICULTY_NOT_FOUND
        );

        const difficulty = cleanText(element.textContent ?? "");

        debugLog(
            "Difficulty",
            difficulty
        );

        return {
            success: true,
            value: difficulty,
        };
    } catch (error) {
        return {
            success: false,
            value: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown difficulty extraction error",
        };
    }
};