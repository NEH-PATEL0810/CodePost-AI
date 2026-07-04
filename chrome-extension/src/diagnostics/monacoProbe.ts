export function inspectMonaco() {

    console.group(
        "===== Monaco ====="
    );

    const w = window as any;

    console.log(
        "window.monaco:",
        w.monaco
    );

    console.log(
        "window.require:",
        w.require
    );

    console.log(
        "window.editor:",
        w.editor
    );

    console.groupEnd();

}