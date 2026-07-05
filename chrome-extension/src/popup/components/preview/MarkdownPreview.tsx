import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface Props {
    markdown: string;
}

export function MarkdownPreview({
    markdown,
}: Props) {
    return (
        <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="font-extrabold text-foreground text-sm mt-5 mb-2 border-b pb-1 uppercase tracking-wider" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="font-extrabold text-foreground text-xs mt-4 mb-2 uppercase tracking-wide" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="font-bold text-foreground text-xs mt-3 mb-1" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="font-black text-foreground" {...props} />
                    ),
                    li: ({ node, children, ...props }) => {
                        const renderChildren = React.Children.map(children, child => {
                            if (typeof child === 'string' && (child.includes('Time Complexity') || child.includes('Space Complexity'))) {
                                const parts = child.split(':');
                                if (parts.length > 1) {
                                    return (
                                        <>
                                            <strong className="font-black text-foreground">{parts[0]}:</strong>
                                            {parts.slice(1).join(':')}
                                        </>
                                    );
                                }
                            }
                            return child;
                        });
                        return <li className="text-sm" {...props}>{renderChildren}</li>;
                    }
                }}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
