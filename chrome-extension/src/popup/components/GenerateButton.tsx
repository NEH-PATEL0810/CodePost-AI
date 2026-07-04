import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface Props {
    onClick: () => void;
}

export function GenerateButton({
    onClick,
}: Props) {

    return (
        <Button
            className="w-full"
            onClick={onClick}
        >
            <Sparkles
                className="mr-2 h-4 w-4"
            />
            Generate Documentation
        </Button>

    );

}