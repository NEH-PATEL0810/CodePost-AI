import { LoaderCircle } from "lucide-react";

interface Props {
    message?: string;
}

export function GeneratingCard({ message }: Props) {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>

            {/* Markdown Container Body Skeleton */}
            <div className="space-y-3 rounded-md border p-4 h-[330px]">
                <div className="flex items-start space-x-2">
                    <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground whitespace-pre-line font-mono leading-relaxed">{message || "Generating documentation..."}</span>
                </div>
                <div className="h-4 bg-muted rounded w-full mt-4"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
                <div className="h-4 bg-muted rounded w-full mt-6"></div>
                <div className="h-4 bg-muted rounded w-11/12"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-5/6 mt-6"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>

            {/* Toolbar Skeleton */}
            <div className="flex gap-2">
                <div className="h-9 bg-muted rounded w-24"></div>
                <div className="h-9 bg-muted rounded w-16"></div>
                <div className="h-9 bg-muted rounded w-16"></div>
                <div className="h-9 bg-muted rounded w-20"></div>
            </div>
        </div>
    );
}