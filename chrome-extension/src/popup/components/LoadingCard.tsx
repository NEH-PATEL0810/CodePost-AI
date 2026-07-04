import type { PopupStatus } from "../types/popup";
import { LoaderCircle } from "lucide-react";
interface Props {
    status?: PopupStatus;
}

export function LoadingCard({ status }: Props){
    const loadingText = status === "checking" ? "Checking page..." : "Extracting problem...";

    return(
        <div className="py-10 flex flex-col items-center gap-3">
             <LoaderCircle
                className="animate-spin"/>
             <p>

                {status === "checking"
                ? "Checking page..."
                : "Extracting problem..."

                }

            </p>
        </div>
    );
}