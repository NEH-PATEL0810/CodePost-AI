import { queryAll } from "../dom/query";
import { SELECTORS } from "../selectors";
import { elementText } from "../parser";
import { debugLog } from "../debug";
import { normalizeArray } from "@/core/normalization/arrays";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";

export const extractExamples: Extractor<string[]> = (
    context
): ExtractionResult<string[]> => {
    try {
        const rawExamples = queryAll(SELECTORS.EXAMPLES).map(elementText);
        const examples = normalizeArray(rawExamples);

        debugLog("Examples", examples);

        return {
            success: true,
            value: examples,
        };
    } catch (error) {
        return {
            success: false,
            value: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown examples extraction error",
        };
    }
};