import { queryOptional } from "../dom/query";
import { SELECTORS } from "../selectors";
import { cleanPreserveLines } from "../parser";
import { normalizeArray } from "@/core/normalization/arrays";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";
/**
 * TODO (Phase 7)
 *
 * LeetCode no longer exposes a stable standalone Constraints selector.
 * Current implementation returns an empty array if the section
 * cannot be located.
 *
 * This will be replaced by the generic Section Parser in Phase 7,
 * which extracts sections based on headings rather than CSS classes.
 */
export const extractConstraints: Extractor<string[]> = (
    context
): ExtractionResult<string[]> => {
    try {
const element = queryOptional(SELECTORS.CONSTRAINTS);

console.log("Constraint Element:", element);

        if (!element) {
            return {
                success: true,
                value: [],
            };
        }

        const rawText = cleanPreserveLines(element.textContent ?? "");
        const rawConstraints = rawText.split("\n").filter(Boolean);
        const constraints = normalizeArray(rawConstraints);

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
