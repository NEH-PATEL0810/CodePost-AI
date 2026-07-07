import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Copy, Check } from "lucide-react";

interface Props {
    markdown: string;
}

function getTextContent(children: React.ReactNode): string {
    let text = "";
    React.Children.forEach(children, child => {
        if (typeof child === "string" || typeof child === "number") {
            text += String(child);
        } else if (React.isValidElement(child)) {
            text += getTextContent((child as React.ReactElement<any>).props.children);
        }
    });
    return text;
}

function CodeBlockWrapper({ code, children, ...props }: { code: string; children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code: ", err);
        }
    };

    return (
        <div className="relative group my-4 rounded-md overflow-hidden border border-border">
            {/* Copy Button */}
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 rounded bg-muted/80 dark:bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 cursor-pointer z-10"
                title="Copy code"
            >
                {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                    <Copy className="h-4 w-4" />
                )}
            </button>
            
            {/* Pre block */}
            <pre className="!m-0 !p-4 overflow-x-auto text-xs bg-muted/20" {...props}>
                {children}
            </pre>
        </div>
    );
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
                    pre: ({ node, children, ...props }) => {
                        const code = getTextContent(children);
                        return (
                            <CodeBlockWrapper code={code} {...props}>
                                {children}
                            </CodeBlockWrapper>
                        );
                    },
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
