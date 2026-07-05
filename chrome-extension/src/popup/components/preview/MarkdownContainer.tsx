import { MarkdownPreview } from "./MarkdownPreview";

interface Props {
    markdown: string;
}

export function MarkdownContainer({
    markdown,
}: Props) {
    const hasMarkdown = markdown && markdown.trim();

    return (
        <div className="h-[330px] rounded-md border p-4 overflow-y-auto">
            {hasMarkdown ? (
                <MarkdownPreview markdown={markdown} />
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground pt-20">
                    <p className="font-semibold text-sm">No documentation generated yet.</p>
                    <p className="text-xs mt-1">Click Generate to create documentation.</p>
                </div>
            )}
        </div>
    );
}
