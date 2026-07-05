import { useEffect } from "react";
import { requestExtraction } from "../services/extraction";
import { detectPage } from "../services/page";
export function useExtraction(
    tabId:number | undefined,
    setState:any
){
    useEffect(() =>{
        if(!tabId) return;

        async function extract(){
            const tab = (await chrome.tabs.get(tabId!)) as chrome.tabs.Tab;

            if (!tab.url) return;

            const pageType = detectPage(tab.url);

            if (pageType !== "problem") {
                setState((prev: any) => ({
                    ...prev,
                    status: "unsupported",
                    loading: false,
                }));
                return;
            }

            try {
                setState((prev: any) => ({
                    ...prev,
                    status: "extracting",
                    loading: true,
                }));

                const response = await requestExtraction(tabId!);
                console.log(
    "[Popup] Response",
    response
);

                setState((prev: any) => ({
                    ...prev,
                    status: "ready",
                    loading: false,
                    problem: response.problem,
                    report: response.report,
                }));
            } catch (error) {
                setState((prev: any) => ({
                    ...prev,
                    status: "error",
                    loading: false,
                    error:
                        error instanceof Error
                            ? error.message
                            : "Extraction failed",
                }));
            }
        }

        extract();

    },[tabId]);
}