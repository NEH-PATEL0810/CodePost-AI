import { queryRequired } from "../dom/query";
import { SELECTORS } from "../selectors";
import  { ExtractionError } from "../errors";
import {debugLog} from "../debug";
import { cleanText } from "../parser";



export function extractDifficulty():string{
    const element = queryRequired(
        SELECTORS.DIFFICULTY,
        ExtractionError.DIFFICULTY_NOT_FOUND
    );

    const difficulty = cleanText(element.textContent ?? "");

    debugLog(
        "Difficulty",
        difficulty
    );

    return difficulty;
}