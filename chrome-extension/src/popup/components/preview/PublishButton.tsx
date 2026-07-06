import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePublish } from "../../hooks/usePublish";
import { useDocument } from "../../context/DocumentContext";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function PublishButton() {
    const { publish } = usePublish();
    const { document } = useDocument();

    const [isPublishing, setIsPublishing] = useState(false);
    const [toast, setToast] = useState<{
        show: boolean;
        type: "success" | "error";
        message: string;
        description?: string;
    }>({
        show: false,
        type: "success",
        message: "",
    });

    const hasMarkdown = !!(document?.currentMarkdown && document.currentMarkdown.trim());
    const isGenerating = document?.isGenerating || false;

    const handlePublish = async () => {
        setIsPublishing(true);
        try {
            const res = (await publish()) as any;
            if (res && res.success) {
                setToast({
                    show: true,
                    type: "success",
                    message: "Documentation ready in the Solution editor.",
                    description: "Review it before submitting.",
                });
                setTimeout(() => {
                    setToast(prev => ({ ...prev, show: false }));
                }, 4000);
            } else {
                const errMsg = res?.error || "Failed to find or click the 'Share my solution' button.";
                setToast({
                    show: true,
                    type: "error",
                    message: "Publish failed",
                    description: errMsg,
                });
                setTimeout(() => {
                    setToast(prev => ({ ...prev, show: false }));
                }, 5000);
            }
        } catch (err) {
            console.error("Publish failed:", err);
            setToast({
                show: true,
                type: "error",
                message: "Publish failed",
                description: err instanceof Error ? err.message : "Could not connect to the tab.",
            });
            setTimeout(() => {
                setToast(prev => ({ ...prev, show: false }));
            }, 5000);
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <>
            <Button
                onClick={handlePublish}
                disabled={!hasMarkdown || isGenerating || isPublishing}
            >
                {isPublishing ? "Publishing..." : "Publish"}
            </Button>

            {toast.show && (
                <div className="fixed bottom-4 right-4 left-4 z-50 flex items-center gap-3 p-3 rounded-lg border bg-background border-border shadow-md animate-in slide-in-from-bottom duration-300">
                    {toast.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    ) : (
                        <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">
                            {toast.message}
                        </p>
                        {toast.description && (
                            <p className="text-[10px] text-muted-foreground mt-0.5 leading-normal">
                                {toast.description}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
