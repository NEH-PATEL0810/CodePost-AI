export function inspectFiber(): void {
    console.group("===== React Fiber =====");

    const editor = document.getElementById("editor");

    if (!editor) {
        console.log("Editor element not found.");
        console.groupEnd();
        return;
    }

    const keys = Object.keys(editor).filter(
        key =>
            key.startsWith("__reactFiber") ||
            key.startsWith("__reactProps")
    );

    console.log("Fiber Keys:", keys);

    for (const key of keys) {
        console.log(key, (editor as any)[key]);
    }

    console.groupEnd();
}