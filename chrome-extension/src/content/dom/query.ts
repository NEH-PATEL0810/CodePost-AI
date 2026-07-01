import { ExtractionError } from "../errors";
import type { QueryOptions,SelectorList } from "./types";

export function queryOne(selectors: SelectorList,options:QueryOptions = {}):Element | null {
    const root = options.root ?? document;
    for(const selector of selectors){
        const element = root.querySelector(selector);

        if(element) return element;
    }

    return null;
}

export function queryRequired(selectors: SelectorList,error:ExtractionError): Element {
    const element = queryOne(selectors);

    if(!element) {
        throw new Error(error);
    }

    return element;
}


export function queryAll(selectors:SelectorList) : Element[]{
    const result: Element[] = [];
    for(const selector of selectors){
        result.push(...document.querySelectorAll(selector));
        if(result.length) break;
    }

    return result;
}


export function queryText(selectors:SelectorList,error:ExtractionError):string{
    const element = queryRequired(selectors,error);
    return(element.textContent ?? "").trim();
}

export function queryOptional(
    selectors:SelectorList
): Element | null {
    return queryOne(selectors);
}


