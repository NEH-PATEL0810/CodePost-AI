import type { PopupStatus } from "../types/popup";

interface Props {
    status?: PopupStatus;
}

export function LoadingCard({ status }: Props){
    const loadingText = status === "checking" ? "Checking page..." : "Extracting problem...";

    return(
        <div className="flex items-center justify-center p-6 text-sm text-muted-foreground animate-pulse">
            {loadingText}
        </div>
    );
}