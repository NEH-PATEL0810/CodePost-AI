import { MessageType } from "@/types/messages";

export function extractProblemFromTab(
    tabId:number
){
    return chrome.tabs.sendMessage(
        tabId,
        {
            type:MessageType.EXTRACT_PROBLEM,
        }
    )
}