export interface ExtractionResult<T> {
    success : boolean;
    value: T|null ;
    error?: string;

}