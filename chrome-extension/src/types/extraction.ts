import type { ProblemData } from "@/types/problem";
import type { ExtractionReport } from "@/core/extraction/report";

export interface ExtractionResponse {
    problem: ProblemData;
    report: ExtractionReport;
}
