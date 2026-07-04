import type { GenerationState } from "../types/generation";

export const initialGenerationState:GenerationState = {
    status:"idle",
    markdown:"",
    error:null,
}