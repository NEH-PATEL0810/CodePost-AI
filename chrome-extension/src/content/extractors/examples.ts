import { queryAll } from "../dom/query";
import { SELECTORS } from "../selectors";
import { elementText } from "../parser";
import { debugLog } from "../debug";


export function extractExample(): string[] {
    const examples = queryAll(SELECTORS.EXAMPLES).map(elementText);

    debugLog("Examples",examples)
    return examples;
}