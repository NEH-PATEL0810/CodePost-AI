export function inspectRuntime() {

    console.group(
        "===== Runtime ====="
    );

    console.log(
        "Window:",
        window
    );

    console.log(
        "Document Ready:",
        document.readyState
    );

    console.log(
        "Current URL:",
        window.location.href
    );

    console.groupEnd();

}