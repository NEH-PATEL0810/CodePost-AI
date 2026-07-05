import { extractProblemFromTab } from "./messaging";
import type { ExtractionResponse } from "@/types/extraction";

export async function requestExtraction(
    tabId:number
): Promise<ExtractionResponse> {
    return await extractProblemFromTab(tabId);
}