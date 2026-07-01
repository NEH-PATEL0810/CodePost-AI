import type { ProblemData } from "@/types/problem";

/**
 * Single entry point for all DOM extraction.
 *
 * Architecture:
 *   Popup → Content Script → extractProblem() → everything else
 *
 * ⚠️ Placeholder implementation — actual DOM extraction in Phase 4.2.
 */
import { extractTitle } from "./extractors/title";
import { extractDifficulty } from "./extractors/difficulty";
import { extractDescription } from "./extractors/description";
import { extractExample } from "./extractors/examples";
import { extractConstraints } from "./extractors/constraints";
import { extractLanguage } from "./extractors/language";
import { extractCode } from "./extractors/code";
import { debugLog } from "./debug";

export function extractProblem(): ProblemData {
    debugLog(
        "Extracting Problem",
        window.location.href
    );
    return {
        title: extractTitle(),
        difficulty: extractDifficulty(),
        description: extractDescription(),
        examples: extractExample(),
        constraints: extractConstraints(),
        language: extractLanguage(),
        code: extractCode(),
        url: window.location.href,
    };
}