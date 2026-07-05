import { Button } from "@/components/ui/button";
import { useRegenerate } from "../../hooks/useRegenerate";
import { useDocument } from "../../context/DocumentContext";

export function RegenerateButton() {
    const { regenerate } = useRegenerate();
    const { document } = useDocument();
    const isGenerating = document?.isGenerating || false;

    const handleRegenerate = async () => {
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
        <Button
            onClick={handleRegenerate}
            disabled={isGenerating}
        >
            {isGenerating ? "Regenerating..." : "Regenerate"}
        </Button>
    );
}
