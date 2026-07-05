import { MessageType } from "@/types/messages";
import type { ExtractionResponse } from "@/types/extraction";

export function extractProblemFromTab(
    tabId:number
): Promise<ExtractionResponse> {
    return chrome.tabs.sendMessage(
        tabId,
        {
            type:MessageType.EXTRACT_PROBLEM,
        }
    )
}