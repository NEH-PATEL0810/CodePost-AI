import {  normalizeText } from "./text";

export function normalizeArray(items:string[]):string[]{
    return items.map(normalizeText).filter(item=>item.length>0);
}