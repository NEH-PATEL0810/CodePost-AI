import type { ExtractionContext } from "./context";

import type { ProblemData } from "@/types/problem";

export class ExtractionManager {
    extract(
        context: ExtractionContext
    ): ProblemData {
        return {
            title: "",
            difficulty: "",
            description: "",
            examples: [],
            constraints: [],
            language: "",
            code: "",
            url: context.url,
        };
    }
}