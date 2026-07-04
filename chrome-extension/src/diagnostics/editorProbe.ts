export function inspectEditor(): void {

    console.group("===== Editor =====");

    const container =
        document.querySelector(".monaco-editor");

    console.log(
        "Container:",
        container
    );

    if (!container) {
        console.groupEnd();
        return;
    }

    console.log(
        "Own Property Names:",
        Object.getOwnPropertyNames(container)
    );

    console.log(
        "Own Symbols:",
        Object.getOwnPropertySymbols(container)
    );

    console.groupEnd();
}