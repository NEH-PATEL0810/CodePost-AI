(function() {
    const currentScript = document.currentScript;
    if (currentScript && currentScript.src) {
        try {
            const url = new URL(currentScript.src);
            if (url.protocol === 'chrome-extension:') {
                const extensionId = url.hostname || url.host;
                window.chrome = window.chrome || {};
                window.chrome.runtime = window.chrome.runtime || {};
                window.chrome.runtime.getURL = window.chrome.runtime.getURL || function(path) {
                    // strip leading slash if present to avoid double slashes
                    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
                    return `chrome-extension://${extensionId}/${cleanPath}`;
                };
                console.log("[CodePost Helper] Mocked chrome.runtime.getURL for extension:", extensionId);
            }
        } catch (e) {
            console.error("[CodePost Helper] Failed to parse URL", e);
        }
    }
})();
