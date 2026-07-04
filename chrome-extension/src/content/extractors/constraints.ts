import { queryOptional } from "../dom/query";
import { SELECTORS } from "../selectors";
import { elementText } from "../parser";
import { debugLog } from "../debug";
import { normalizeArray } from "@/core/normalization/arrays";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";

export const extractConstraints: Extractor<string[]> = (
    context
): ExtractionResult<string[]> => {
    try {
        const element = queryOptional(SELECTORS.CONSTRAINTS);

        if (!element) {
            return {
                success: true,
                value: [],
            };
        }

        const rawConstraints = elementText(element).split("\n").filter(Boolean);
        const constraints = normalizeArray(rawConstraints);

        debugLog("Constraints", constraints);

        return {
            success: true,
            value: constraints,
        };
    } catch (error) {
        return {
            success: false,
            value: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown constraints extraction error",
        };
    }
};
