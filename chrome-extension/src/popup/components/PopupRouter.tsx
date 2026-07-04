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
        return <GeneratingCard />;
    }
    
    if (genState.status === "completed") {
        return <PreviewCard markdown={genState.result?.markdown || ""} />;
    }
    
    if (genState.status === "failed") {
        return <ErrorCard />;
    }

    switch(state.status){
        case "unsupported":
            return <UnsupportedCard />;
        
        case "error":
            return <ErrorCard />;
        
        case "ready":
            return state.problem ? (
                <ProblemCard problem={state.problem} generate={generate} />
            ): (
                <ErrorCard />
            );
        
        case "checking":
        case "extracting":
        case "idle":
        default:
            return <LoadingCard status={state.status} />;
    }
}