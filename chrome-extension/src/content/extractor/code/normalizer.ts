export function normalizeCode(lines: string[]): string {
    return lines
        .map(line => line.replace(/\u00A0/g, " "))
        .map(line => line.replace(/\s+$/, ""))
        .join("\n")
        .trimEnd();
}
