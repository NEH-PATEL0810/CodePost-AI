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
                console.log("[Popup] Response", response);

                try {
                    const results = await chrome.scripting.executeScript({
                        target: { tabId: tabId! },
                        world: "MAIN",
                        func: () => {
                            try {
                                let code = "";
                                const win = window as any;
                                if (win.monaco && win.monaco.editor) {
                                    const models = win.monaco.editor.getModels();
                                    if (models && models.length > 0) {
                                        let mainModel = models[0];
                                        for (let m of models) {
                                            if (m.uri && m.uri.path && m.uri.path.indexOf('solution') !== -1) {
                                                mainModel = m;
                                                break;
                                            }
                                        }
                                        code = mainModel.getValue();
                                    }
                                }
                                if (!code) {
                                    const cmContent = document.querySelector('.cm-content') as any;
                                    if (cmContent && cmContent.cmView && cmContent.cmView.view) {
                                        code = cmContent.cmView.view.state.doc.toString();
                                    }
                                }
                                if (!code) {
                                    const editorEl = document.querySelector('.monaco-editor') as any;
                                    if (editorEl && editorEl.env && editorEl.env.editor) {
                                        code = editorEl.env.editor.getValue();
                                    }
                                }
                                return code;
                            } catch (e) {
                                return "";
                            }
                        }
                    });

                    const extractedCode = results?.[0]?.result;
                    if (extractedCode && response.problem) {
                        response.problem.code = extractedCode;
                    }
                } catch (scriptError) {
                    console.warn("[Popup] Main world script injection failed, using fallback code.", scriptError);
                }

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