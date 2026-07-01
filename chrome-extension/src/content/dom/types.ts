export type Querytarget = Document | Element ;

export type SelectorList = string [];

export interface QueryOptions {
    required?: boolean;
    root?: Querytarget;
}