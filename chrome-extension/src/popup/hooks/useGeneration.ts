import { useState } from "react";

import {
    initialGenerationState,
} from "../state/generationState";

import {
    generateDocumentation,
} from "../services/generation";

import type {
    ProblemData,
} from "@/core/types/problem";

export function useGeneration(){
    const [state,setState] = useState(initialGenerationState);

    async function generate(problem:ProblemData){
        setState({
            status:"generating",
            markdown:"",
            error:null,
        });

        try{
            const markdown = await generateDocumentation(problem);
            setState({
                status:"completed",
                markdown,
                error:null
            })
        }
        catch(error){
            setState({
                status:"failed",
                markdown:"",
                error:
                error instanceof Error
                ? error.message:"Unknown error",
            });
        }
    }
    return{
        state,generate,
    };
}