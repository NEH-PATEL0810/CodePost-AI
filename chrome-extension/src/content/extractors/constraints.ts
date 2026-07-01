import { queryOptional } from "../dom/query";
import { SELECTORS } from "../selectors";
import { elementText } from "../parser";
import { debugLog } from "../debug";



export function extractConstraints(): string[] {

    const element = queryOptional(SELECTORS.CONSTRAINTS);

    if(!element)
        return [];


    const constraints = elementText(element).split("\n").filter(Boolean);

    debugLog("Constraints",constraints);
    return constraints;

}
