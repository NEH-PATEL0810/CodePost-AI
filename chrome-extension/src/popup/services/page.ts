export type PageType =
    | "problem"
    | "contest"
    | "discuss"
    | "progress"
    | "other";

export function detectPage(url: string): PageType {
    if (/^https:\/\/leetcode\.com\/problems\/[^/]+\/?$/.test(url))
        return "problem";

    if (url.includes("/contest"))
        return "contest";

    if (url.includes("/discuss"))
        return "discuss";

    if (url.includes("/progress"))
        return "progress";

    return "other";
}