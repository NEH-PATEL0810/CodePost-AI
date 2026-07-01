import { queryRequired } from "../dom/query";
import { SELECTORS } from "../selectors";
import { ExtractionError } from "../errors";
import { elementText } from "../parser";
import { normalizeParagraphs } from "../normalizer";
import { debugLog } from "../debug";
export function extractDescription(){
    const element = queryRequired(
        SELECTORS.DESCRIPTION,
        ExtractionError.DESCRIPTION_NOT_FOUND
    );

    const description = normalizeParagraphs(elementText(element));
    
    debugLog(
        "Description",
        description
    );
    return description;
}