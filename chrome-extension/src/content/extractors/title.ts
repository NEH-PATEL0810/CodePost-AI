import { queryText } from "../dom/query";
import { SELECTORS } from "../selectors";
import { ExtractionError } from "../errors";
import { cleanText } from "../parser";
import { normalizeTitle } from "@/core/normalization/title";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";

export const extractTitle: Extractor<string> = (
    context
): ExtractionResult<string> => {
    try {
        const raw = cleanText(
            queryText(
                SELECTORS.TITLE,
                ExtractionError.TITLE_NOT_FOUND
            )
        );
        const title = normalizeTitle(raw);

        return {
            success: true,
            value: title,
        };
    } catch (error) {
        return {
            success: false,
            value: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown title extraction error",
        };
    }
};
