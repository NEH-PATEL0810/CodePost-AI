/*
import pageBridgeUrl from "../page/page-bridge.ts?script";

export class PageInjector {
    inject() {
        if (document.getElementById("__codepost_bridge__"))
            return;

        const script = document.createElement("script");
        script.id = "__codepost_bridge__";
        script.src = chrome.runtime.getURL(pageBridgeUrl);
        script.onload = () => {
            console.log("[Injector] Bridge Loaded");
        };
        script.onerror = () => {
            console.error("[Injector] Bridge Failed");
        };
        document.documentElement.appendChild(script);
    }
}
*/

export class PageInjector {
    inject() {
        const src = chrome.runtime.getURL(
            "src/page/page-bridge.ts"
        );
        console.log("[Injector] URL =", src);
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            console.log("[Injector] Loaded");
        };
        script.onerror = (e) => {
            console.error("[Injector] Failed", src, e);
        };
        document.documentElement.appendChild(script);
    }
}
