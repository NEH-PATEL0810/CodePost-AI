import { queryText } from "../dom/query";
import { SELECTORS } from "../selectors";
import { ExtractionError } from "../errors";
import { cleanText } from "../parser";
import { debugLog } from "../debug";

// export function extractTitle():string{
//    const title = cleanText(
//     queryText(
//         SELECTORS.TITLE,
//         ExtractionError.TITLE_NOT_FOUND
//     )
//    );

//    debugLog(
//     "Problem Title",
//     title
//    );
//    return title;
// }

import type {Extractor} from "@/core/extraction/interfaces";
// import type {ExtractionContext} from "@/core/extraction/context";
import type {ExtractionResult} from "@/core/extraction/result";

export const extractTitle: Extractor<string> = (
    context
) : ExtractionResult<string> => {
    try{
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
   return {
    success:true,
    value:title,
   }
    }catch(error){
        return{
            success:false,
            value:null,
            error:
            error instanceof Error ? error.message : "Unknown title extraction error",
        };
    }
};
