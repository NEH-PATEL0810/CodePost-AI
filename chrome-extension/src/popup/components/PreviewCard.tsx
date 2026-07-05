import { useState } from "react";
import { PreviewHeader } from "./preview/PreviewHeader";
import { MarkdownContainer } from "./preview/MarkdownContainer";
import { PreviewToolbar } from "./preview/PreviewToolbar";
import { EditorToolbar } from "./preview/EditorToolbar";
import { MarkdownEditor } from "./preview/MarkdownEditor";
import { EditorStatus } from "./preview/EditorStatus";
import { EditorActions } from "./preview/EditorActions";
import type { ProblemData } from "@/core/types/problem";
import { useDocument } from "../context/DocumentContext";

interface Props {
    problem: ProblemData;
}

export function PreviewCard({
    problem,
}: Props) {
    const { document: doc, updateMarkdown } = useDocument();
    console.log(doc);
    const markdown = doc?.currentMarkdown || "";

    const [preview, setPreview] = useState(true);

    const handleReset = () => {
        if (doc) {
            updateMarkdown(doc.originalMarkdown);
        }
    };

    return (
        <div className="space-y-4">
            <PreviewHeader
                title={problem.title}
                difficulty={problem.difficulty}
                language={problem.language}
            />

            <EditorToolbar
                preview={preview}
                setPreview={setPreview}
            />

            {preview ? (
                <MarkdownContainer
                    markdown={markdown}
                />
            ) : (
                <MarkdownEditor
                    value={markdown}
                    onChange={updateMarkdown}
                />
            )}

            <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3">
                    <EditorStatus edited={doc?.isEdited || false} />
                    {doc?.isEdited && (
                        <EditorActions onReset={handleReset} />
                    )}
                </div>
                <PreviewToolbar />
            </div>
        </div>
    );
}