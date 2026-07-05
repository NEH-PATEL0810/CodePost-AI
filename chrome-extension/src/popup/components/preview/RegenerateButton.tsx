import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRegenerate } from "../../hooks/useRegenerate";
import { useDocument } from "../../context/DocumentContext";
import { AlertDialog } from "./AlertDialog";

export function RegenerateButton() {
    const { regenerate } = useRegenerate();
    const { document } = useDocument();
    const [showConfirm, setShowConfirm] = useState(false);
    const isGenerating = document?.isGenerating || false;

    const handleButtonClick = () => {
        if (document?.isEdited) {
            setShowConfirm(true);
        } else {
            triggerRegenerate();
        }
    };

    const triggerRegenerate = async () => {
        try {
            await regenerate();
        } catch (err) {
            alert(
                err instanceof Error 
                    ? `Regeneration failed: ${err.message}` 
                    : "Regeneration failed: Unable to contact backend server."
            );
        }
    };

    return (
        <>
            <Button
                onClick={handleButtonClick}
                disabled={isGenerating}
            >
                {isGenerating ? "Regenerating..." : "Regenerate"}
            </Button>

            <AlertDialog
                open={showConfirm}
                onOpenChange={setShowConfirm}
                title="Are you absolutely sure?"
                description="Regenerating will overwrite your current unsaved edits. This action cannot be undone."
                actionText="Discard & Regenerate"
                onAction={triggerRegenerate}
            />
        </>
    );
}
