import type { ProblemData } from "@/types/problem";
import type { ExtractionReport } from "@/core/extraction/report";


export type PopupStatus =
    | "idle"
    | "checking"
    | "unsupported"
    | "extracting"
    | "ready"
    | "generating"
    | "preview"
    | "posting"
    | "success"
    | "error";


export interface PopupState{
    status: PopupStatus;
    loading: boolean;
    error:string|null;
    problem:ProblemData|null;
    report?: ExtractionReport;
}