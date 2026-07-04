import { useState } from "react";
import { initialPopupState } from "../state/popupState";

export function usePopupState(){
    const [state,setState] = useState(initialPopupState);
    return {
        state,setState,
    };
}