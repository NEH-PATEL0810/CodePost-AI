import { SELECTORS } from "../selectors";
import { debugLog } from "../debug";
import { leetcodeAdapter } from "@/platforms/leetcode/adapter";
import { parseText } from "@/platforms/leetcode/parser";
import type { Extractor } from "@/core/extraction/interfaces";
import type { ExtractionResult } from "@/core/extraction/result";

export const extractLanguage: Extractor<string> = (
    context
): ExtractionResult<string> => {
    try {
        const element = leetcodeAdapter.query(SELECTORS.LANGUAGE);
        const language = parseText(element);

        debugLog("Language", language);

        return {
            success: true,
            value: language,
        };
    } catch (error) {
        return {
            success: false,
            value: null,
            error:
                error instanceof Error
                    ? error.message
                    : "Unknown language extraction error",
        };
    }
};