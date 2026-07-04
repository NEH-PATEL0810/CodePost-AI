import type { ExtractionContext } from "./context";
import type { ExtractionResult } from "./result";

export type Extractor<T> = (
    context: ExtractionContext
) => ExtractionResult<T>;