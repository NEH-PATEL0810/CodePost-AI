import { Badge } from "@/components/ui/badge";

interface Props {
    difficulty: string;
}

export function DifficultyBadge({
    difficulty,
}: Props) {

    let className =
        "bg-gray-500";

    switch (
        difficulty.toLowerCase()
    ) {

        case "easy":
            className =
                "bg-green-500";
            break;

        case "medium":
            className =
                "bg-yellow-500";
            break;

        case "hard":
            className =
                "bg-red-500";
            break;
    }

    return (

        <Badge className={className}>

            {difficulty}

        </Badge>

    );

}