/**
 * Text parsing utilities.
 *
 * Use these helpers everywhere instead of calling .textContent?.trim()
 * inline — keeps extraction code clean and consistent.
 */

/**
 * Removes unnecessary whitespace and trims a string.
 */
export function cleanText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

/**
 * Converts an array of DOM Elements into a clean string array
 * by extracting and normalising each element's textContent.
 */
export function elementText(element:Element):string{
    return cleanText(element.textContent ?? "");
}

export function elementsText(elements:Element[]):string[]{
    return elements.map(elementText);
}