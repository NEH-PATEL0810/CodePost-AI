export function normalizeWhitespace(text: string):string{
    return text
    .replace(/\u00A0/g," ")
    .replace(/\t/g," ")
    .replace(/\r/g,"")
    .replace(/[]{2,}/g," ")
    .replace(/\n{3,}/g,"\n\n")
    .trim();
}


export function normalizeParagraphs(text:string):string{
    return normalizeWhitespace(text)
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

