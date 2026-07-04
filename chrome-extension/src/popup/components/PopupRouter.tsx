import { LoadingCard } from "./LoadingCard";
import { ErrorCard } from "./ErrorCard";
import { UnsupportedCard } from "./UnsupportedCard";
import { ProblemCard } from "./ProblemCard";
import type { PopupState } from "../types/popup";

interface Props {
    state: PopupState;
}

export function PopupRouter({state}: Props){
    switch(state.status){
        case "unsupported":
            return <UnsupportedCard />;
        
        case "error":
            return <ErrorCard />;
        
        case "ready":
            return state.problem ? (
                <ProblemCard problem={(state.problem)} />
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