export function parseText(
    element:Element | null
):string{
    return element?.textContent?.trim() ?? "";
}