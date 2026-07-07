import pageBridgeUrl from "../../page/page-bridge.ts?script";

export class PageInjector {
    inject() {
        const id = "__codepost_bridge__";
        if (document.getElementById(id)) {
            console.log("[Injector] Bridge already injected");
            return;
        }

        console.log("[Injector] Injecting runtime...");

        // 1. Inject the chrome helper first to define window.chrome.runtime.getURL in the page origin
        const setup = document.createElement("script");
        setup.src = chrome.runtime.getURL("define-chrome.js");
        setup.onload = () => {
            setup.remove();

            // 2. Inject the page-bridge script
            const script = document.createElement("script");
            script.id = id;
            script.src = chrome.runtime.getURL(pageBridgeUrl);
            script.onload = () => {
                console.log("[Injector] Runtime loaded");
            };
            script.onerror = () => {
                console.error("[Injector] Runtime failed");
            };
            document.documentElement.appendChild(script);
        };
        setup.onerror = () => {
            console.error("[Injector] Helper setup failed");
        };
        document.documentElement.appendChild(setup);
    }
}
