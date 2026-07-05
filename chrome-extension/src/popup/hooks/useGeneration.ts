import { useState } from "react";
import { useDocument } from "../context/DocumentContext";

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
    const { setDocument } = useDocument();
    const [state,setState] = useState(initialGenerationState);

    async function generate(problem:ProblemData){
        setState(prev => ({
            ...prev,
            status:"generating",
            result:null,
            error:null,
        }));

        try{
            const result = await generateDocumentation(problem);
            
            setDocument({
                originalMarkdown: result.markdown,
                currentMarkdown: result.markdown,
                generatedAt: new Date(),
                isEdited: false,
            });

            setState(prev => ({
                ...prev,
                status:"completed",
                result,
                error:null
            }));
        }
        catch(error){
            setState(prev => ({
                ...prev,
                status:"failed",
                result:null,
                error:
                error instanceof Error
                ? error.message:"Unknown error",
            }));
        }
    }
    return{
        state,generate,
    };
}