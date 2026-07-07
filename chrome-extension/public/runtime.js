console.log("==================================");
console.log("[CodePost Runtime] Started");
console.log("[CodePost Runtime] Running inside page");
console.log("URL:", location.href);
console.log("==================================");

window.addEventListener("message", event => {
    if (event.source !== window)
        return;

    const { type } = event.data;

    if (type !== "CODEPOST_PING")
        return;

    console.log("[Runtime] PING Received");

    window.postMessage({
        type: "CODEPOST_PONG",
    }, "*");
});
