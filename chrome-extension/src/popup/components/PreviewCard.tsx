import { PreviewHeader } from "./preview/PreviewHeader";
import { MarkdownContainer } from "./preview/MarkdownContainer";
import { PreviewToolbar } from "./preview/PreviewToolbar";
import type { ProblemData } from "@/core/types/problem";

interface Props {
    problem: ProblemData;
    markdown: string;
}

export function PreviewCard({
    problem,
    markdown,
}: Props) {
    return (
        <div className="space-y-4">
            <PreviewHeader
                title={problem.title}
                difficulty={problem.difficulty}
                language={problem.language}
            />
            <MarkdownContainer
                markdown={markdown}
            />
            <PreviewToolbar />
        </div>
    );
}