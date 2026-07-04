import type{
    ProblemData
} from "@/core/types/problem";
import { extractionScore } from "@/core/validation/score";

interface Props{
    problem:ProblemData;
}

export function ProblemCard({
    problem,
}:Props){
    const score = extractionScore(problem);

    return(
        <div className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">
                {problem.title || "Unknown Problem"}
            </h2>
            
            <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                <p>
                    <span className="font-medium text-foreground">Difficulty:</span> {problem.difficulty || "N/A"}
                </p>
                <p>
                    <span className="font-medium text-foreground">Language:</span> {problem.language || "N/A"}
                </p>
                <p>
                    <span className="font-medium text-foreground">Extraction Score:</span> {score} / 7
                </p>
            </div>
        </div>
    );
}