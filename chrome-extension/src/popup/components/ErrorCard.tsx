import { TriangleAlert } from "lucide-react";

interface Props {
    message?: string;
}

export function ErrorCard({ message }: Props) {
    return (
        <div className="py-10 text-center px-4">
            <TriangleAlert className="mx-auto mb-3 text-destructive" />
            <h2 className="font-semibold text-destructive">
                Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                {message || "An unexpected error occurred."}
            </p>
        </div>
    );
}