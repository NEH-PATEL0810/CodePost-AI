import type { ExtractionContext } from "./context";
import type { ExtractionResult } from "./result";

export interface Extractor<T> {
    matches(context : ExtractionContext) : boolean;
    extract(
        context : ExtractionContext
    ): ExtractionResult<T>;
}