import { queryText } from "../dom/query";
import { SELECTORS } from "../selectors";
import { ExtractionError } from "../errors";
import { cleanText } from "../parser";
import { debugLog } from "../debug";

export function extractTitle():string{
   const title = cleanText(
    queryText(
        SELECTORS.TITLE,
        ExtractionError.TITLE_NOT_FOUND
    )
   );

   debugLog(
    "Problem Title",
    title
   );
   return title;
}
