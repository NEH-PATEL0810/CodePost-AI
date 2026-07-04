import type { GenerateResponse } from "../types";
import type { GeneratedSolution } from "@/popup/types/generation";

export function mapGenerateResponse(
    response: GenerateResponse
): GeneratedSolution {
    return {
        markdown: response.result.markdown,
        metadata: {
            provider: response.result.metadata.provider,
            version: response.result.metadata.version,
        },
    };
}