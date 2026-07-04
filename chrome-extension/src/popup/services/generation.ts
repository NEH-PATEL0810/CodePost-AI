import { ApiClient } from "@/api/client";
import {API} from "@/api/endpoints";
import type { GenerateRequest,GenerateResponse} from "@/api/types";
import type { ProblemData } from "@/core/types/problem";



export async function generateDocumentation(problem:ProblemData):Promise<GenerateResponse["result"]>{
    const request:GenerateRequest = {
        title: problem.title,
        difficulty:problem.difficulty,
        description:problem.description,
        examples:problem.examples,
        constraints:problem.constraints,
        language:problem.language,
        code:problem.code,
        url:problem.url,
    };

    console.log("Request =", request);
    console.log("Code length =", request.code.length);
    console.log(JSON.stringify(request));

     const response =
        await ApiClient.post<

            GenerateRequest,

            GenerateResponse

        >(API.GENERATE, request);

    return response.result;
}
