export function inspectReact() {

    console.group(
        "===== React ====="
    );

    console.log(
        "__REACT_DEVTOOLS_GLOBAL_HOOK__",
        (window as any)
        .__REACT_DEVTOOLS_GLOBAL_HOOK__
    );

    console.groupEnd();

}