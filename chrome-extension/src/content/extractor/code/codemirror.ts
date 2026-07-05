import { normalizeCode } from "./normalizer";
import { isValidCode } from "./validator";
import type { CodeExtractionResult } from "./types";

export function extractFromCodeMirror(): CodeExtractionResult {

    const lineNodes =
        document.querySelectorAll(".cm-line");

    if (!lineNodes.length) {
        return {
            success: false,
            code: "",
            lineCount: 0,
            strategy: "codemirror",
        };
    }

    const lines = [...lineNodes]
        .map(node => node.textContent ?? "");

    const code = normalizeCode(lines);

    return {
        success: isValidCode(code),
        code,
        lineCount: lines.length,
        strategy: "codemirror",
    };
}
