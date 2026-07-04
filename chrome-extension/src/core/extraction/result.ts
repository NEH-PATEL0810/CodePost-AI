export interface ExtractionResult<T> {
    success : boolean;
    value?: T;
    error?: string;

}