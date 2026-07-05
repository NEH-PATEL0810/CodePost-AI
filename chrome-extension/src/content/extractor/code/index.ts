import { debugLog } from "@/content/debug";
import { extractFromCodeMirror } from "./codemirror";

export function extractCode(): string {

    const result = extractFromCodeMirror();

    debugLog("Code Extraction", result);

    return result.success
        ? result.code
        : "";
}
