import { LoadingCard } from "./LoadingCard";
import { ErrorCard } from "./ErrorCard";
import { UnsupportedCard } from "./UnsupportedCard";
import { ProblemCard } from "./ProblemCard";
import { GeneratingCard } from "./GeneratingCard";
import { PreviewCard } from "./PreviewCard";
import type { PopupState } from "../types/popup";
import type { ProblemData } from "@/core/types/problem";
import type { GenerationState } from "../types/generation";

interface Props {
    state: PopupState;
    genState: GenerationState;
    generate: (problem: ProblemData) => void;
}

export function PopupRouter({state, genState, generate}: Props){
    if (genState.status === "generating") {
        return <GeneratingCard message={genState.message} />;
    }
    
    if (genState.status === "completed") {
        return <PreviewCard problem={state.problem!} />;
    }
    
    if (genState.status === "failed") {
        let displayError = genState.error || "An unexpected error occurred.";
        const lower = displayError.toLowerCase();
        
        if (
            lower.includes("incomplete") ||
            lower.includes("boilerplate") ||
            lower.includes("empty")
        ) {
            displayError = "No complete solution detected.\n\nFinish your solution before generating documentation.";
        } else if (
            lower.includes("rate limit")
        ) {
            displayError = "Rate limit exceeded.\n\nPlease wait a few seconds.";
        } else if (
            lower.includes("connect") ||
            lower.includes("unavailable")
        ) {
            displayError = "Unable to contact AI provider.\n\nPlease try again.";
        } else if (
            lower.includes("receiving end") ||
            lower.includes("invalidated")
        ) {
            displayError = "Extension reloaded.\n\nPlease refresh your LeetCode tab to reconnect.";
        }
        
        return <ErrorCard message={displayError} />;
    }

    switch(state.status){
        case "unsupported":
            return <UnsupportedCard />;
        
        case "error": {
            let errorMsg = state.error || "An error occurred while loading the problem.";
            const lowerErr = errorMsg.toLowerCase();
            if (
                lowerErr.includes("receiving end") ||
                lowerErr.includes("invalidated") ||
                lowerErr.includes("connection")
            ) {
                errorMsg = "Extension reloaded.\n\nPlease refresh your LeetCode tab to reconnect.";
            }
            return <ErrorCard message={errorMsg} />;
        }
        
        case "ready":
            return state.problem ? (
                <ProblemCard problem={state.problem} generate={generate} />
            ): (
                <ErrorCard message="No problem context found on the page." />
            );
        
        case "checking":
        case "extracting":
        case "idle":
        default:
            return <LoadingCard status={state.status} />;
    }
}