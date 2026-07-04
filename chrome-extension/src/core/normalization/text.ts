export function normalizeText( text:string): string{
     return text

        .replace(/\u00A0/g, " ")

        .replace(/\r/g, "")

        .replace(/\t/g, " ")

        .replace(/[ ]+/g, " ")

        .replace(/\n{3,}/g, "\n\n")

        .trim();
}