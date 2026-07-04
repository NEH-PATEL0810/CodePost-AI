import type { ProblemData } from "@/types/problem";

/**
 * Single entry point for all DOM extraction.
 *
 * Architecture:
 *   Popup → Content Script → extractProblem() → everything else
 *
 * ⚠️ Placeholder implementation — actual DOM extraction in Phase 4.2.
 */
import { debugLog } from "./debug";
import { ExtractionManager } from "@/core/extraction/manager";
import type { ExtractionContext } from "@/core/extraction/context";


export function extractProblem(): ProblemData {
    debugLog(
        "Extracting Problem",
        window.location.href
    );

    const context: ExtractionContext = {
        document,
        url: window.location.href,
    };

    const manager = new ExtractionManager();


    return manager.extract(context);
}