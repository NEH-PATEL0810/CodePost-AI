import type { GenerationState } from "../types/generation";

export const initialGenerationState:GenerationState = {
    status:"idle",
    result:null,
    error:null,
}