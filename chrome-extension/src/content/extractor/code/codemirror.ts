import { normalizeCode } from "./normalizer";
import { isValidCode } from "./validator";
import type { CodeExtractionResult } from "./types";

export function extractFromCodeMirror(): CodeExtractionResult {

    let lineNodes = document.querySelectorAll(".cm-line");
    let strategy = "codemirror";

    if (!lineNodes.length) {
        lineNodes = document.querySelectorAll(".view-line");
        strategy = "monaco";
    }

    if (!lineNodes.length) {
        lineNodes = document.querySelectorAll(".CodeMirror-line");
        strategy = "codemirror5";
    }

    if (!lineNodes.length) {
        return {
            success: false,
            code: "",
            lineCount: 0,
            strategy: "none",
        };
    }

    const lines = [...lineNodes]
        .map(node => node.textContent?.replace(/\u00A0/g, ' ') ?? "");

    const code = normalizeCode(lines);

    return {
        success: isValidCode(code),
        code,
        lineCount: lines.length,
        strategy,
    };
}
