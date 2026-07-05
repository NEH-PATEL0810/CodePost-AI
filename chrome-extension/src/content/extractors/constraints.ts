import { queryOptional } from "../dom/query";
import { SELECTORS } from "../selectors";
import { getConstraintsList } from "../extractor/problem/sections/parser";
import { debugLog } from "../debug";
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
        const list = getConstraintsList();

        if (!list) {
            return {
                success: true,
                value: [],
            };
        }

        const constraints = Array.from(
            list.querySelectorAll("li")
        ).map(li =>
            cleanPreserveLines(li.textContent ?? "")
        );

        debugLog("Constraint List", list);
        debugLog("Constraints", constraints);

        return {
            success: true,
            value: normalizeArray(constraints),
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
