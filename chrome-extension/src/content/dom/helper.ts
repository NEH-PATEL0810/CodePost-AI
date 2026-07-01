import { cleanText } from "../parser";

// import (cleanText)
export function safeText(element:Element | null):string{
    if(!element) return "";

    return cleanText(element.textContent ?? "");
}

export function exists(element: Element | null): boolean {
    return !!element;
}