interface Props {

    title: string;

    difficulty: string;

    language: string;

}

export function PreviewHeader({
    title,
    difficulty,
    language,
}: Props) {
    let diffColor = "text-muted-foreground";
    switch (difficulty.toLowerCase()) {
        case "easy":
            diffColor = "text-emerald-600 dark:text-emerald-400 font-semibold";
            break;
        case "medium":
            diffColor = "text-amber-600 dark:text-amber-400 font-semibold";
            break;
        case "hard":
            diffColor = "text-rose-600 dark:text-rose-400 font-semibold";
            break;
    }

    return (
        <div className="space-y-1">
            <h2 className="text-lg font-extrabold tracking-tight">
                {title}
            </h2>
            <div className="flex items-center gap-2 text-sm">
                <span className={diffColor}>{difficulty}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground font-medium">{language}</span>
            </div>
        </div>
    );
}
