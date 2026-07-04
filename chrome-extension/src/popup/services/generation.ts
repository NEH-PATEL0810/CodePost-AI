import { ApiClient } from "@/api/client";
import {API} from "@/api/endpoints";
import type { GenerateRequest,GenerateResponse} from "@/api/types";
import type { ProblemData } from "@/core/types/problem";
import { mapProblemToGenerateRequest } from "@/api/mappers/generationMapper";



export async function generateDocumentation(problem:ProblemData):Promise<GenerateResponse["result"]>{
    const request = mapProblemToGenerateRequest(problem);

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
