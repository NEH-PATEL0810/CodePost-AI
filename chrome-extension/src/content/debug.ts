export const DEBUG_MODE = true;

export function debugLog(
    label: string,
    value: unknown = ""
) {
    if (!DEBUG_MODE) return;
    console.log(
        `[CodePost AI] ${label}`,
        value
    );
}