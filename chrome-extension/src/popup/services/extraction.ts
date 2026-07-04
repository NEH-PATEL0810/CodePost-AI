import { extractProblemFromTab } from "./messaging";

export async function requestExtraction(
    tabId:number
) {
    return await extractProblemFromTab(tabId);
}