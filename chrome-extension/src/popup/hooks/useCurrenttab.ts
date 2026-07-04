import { useEffect,useState } from "react";

export function useCurrentTab() {
    const [tab,setTab] = useState<chrome.tabs.Tab | null>(null);

    useEffect(()=>{
        chrome.tabs.query(
            {
                active:true,
                currentWindow:true,
            },
            tabs => {
                setTab(
                    tabs[0] ?? null
                );
            }
        );
    },[]);
    return tab;
}