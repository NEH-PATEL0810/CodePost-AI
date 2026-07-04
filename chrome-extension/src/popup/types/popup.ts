import type { ProblemData } from "@/types/problem";

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
}