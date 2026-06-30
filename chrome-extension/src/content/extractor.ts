import type { ProblemData } from "@/types/problem";

/**
 * Single entry point for all DOM extraction.
 *
 * Architecture:
 *   Popup → Content Script → extractProblem() → everything else
 *
 * ⚠️ Placeholder implementation — actual DOM extraction in Phase 4.2.
 */
export function extractProblem(): ProblemData {
    return {
        title: "",
        difficulty: "",
        description: "",
        examples: [],
        constraints: [],
        language: "",
        code: "",
        url: window.location.href,
    };
}