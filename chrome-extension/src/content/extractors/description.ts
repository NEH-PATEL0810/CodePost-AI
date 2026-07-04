import { queryRequired } from "../dom/query";
import { SELECTORS } from "../selectors";
import { ExtractionError } from "../errors";
import { elementText } from "../parser";
import { normalizeText } from "@/core/normalization/text";
import { debugLog } from "../debug";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";

export const extractDescription: Extractor<string> = (
    context
): ExtractionResult<string> => {
    try {
        const element = queryRequired(
            SELECTORS.DESCRIPTION,
            ExtractionError.DESCRIPTION_NOT_FOUND
        );

        const description = normalizeText(elementText(element));
        
        debugLog(
            "Description",
            description
        );

        return {
            success: true,
            value: description,
        };
    } catch (error) {
        return {
            success: false,
            value: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown description extraction error",
        };
    }
};