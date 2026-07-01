/**
 * Text parsing utilities.
 *
 * Use these helpers everywhere instead of calling .textContent?.trim()
 * inline — keeps extraction code clean and consistent.
 */

// import { text } from "stream/consumers";

/**
 * Removes unnecessary whitespace and trims a string.
 */
export function cleanText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

export function cleanPreserveLines(text: string):string{
    return text
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ")
    .trim();

}

export function elementText(element:Element):string{
    return cleanText(element.textContent ?? "");
}

export function elementsText(elements:Element[]):string[]{
    return elements.map(elementText);
}