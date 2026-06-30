import { useEffect,useState } from "react";
import { getCurrentTab } from "@/services/chrome.services.ts";

export function usePageStatus(){
    const[status,setStatus] = useState<any>(null);

    useEffect(() => {
        async function checkPage(){
            const tab = await getCurrentTab();

            if(!tab?.id) return;

            chrome.tabs.sendMessage(
                tab.id,
                {
                    type:"CHECK_PAGE",
                },
                (response) => {
                    setStatus(response);
                }
            );
        }
        checkPage();
    },[]);

    return status;
}