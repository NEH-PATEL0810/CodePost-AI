export function toMarkdownList(items:string[]):string{
    return items.map(item => `-${item}`).join("\n");
}

