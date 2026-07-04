export function normalizeTitle(title: string): string {
    return title.replace(/^\d+\.\s*/, "").trim();
}
