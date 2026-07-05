interface Props {
    value: string;
    onChange: (value: string) => void;
}

export function MarkdownEditor({
    value,
    onChange,
}: Props) {
    return (
        <textarea
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="flex min-h-[340px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none font-mono"
        />
    );
}
