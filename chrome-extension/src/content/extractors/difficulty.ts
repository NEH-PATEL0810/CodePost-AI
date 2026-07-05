import { queryRequired } from "../dom/query";
import { SELECTORS } from "../selectors";
import { ExtractionError } from "../errors";
import { cleanText } from "../parser";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";

export const extractDifficulty: Extractor<string> = (
    _context
): ExtractionResult<string> => {
    try {
        const element = queryRequired(
            SELECTORS.DIFFICULTY,
            ExtractionError.DIFFICULTY_NOT_FOUND
        );

        const difficulty = cleanText(element.textContent ?? "");

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