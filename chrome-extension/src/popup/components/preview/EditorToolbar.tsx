interface Props {

    preview: boolean;

    setPreview: (

        preview: boolean

    ) => void;

}

export function EditorToolbar({

    preview,

    setPreview,

}: Props) {

    return (

        <div className="flex bg-muted/50 dark:bg-muted/30 p-0.5 rounded-lg border border-border w-fit">

            <button

                onClick={() => setPreview(true)}

                className={`px-4 py-1 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${

                    preview

                        ? "bg-background text-foreground shadow-xs"

                        : "text-muted-foreground hover:text-foreground"

                }`}

            >

                Preview

            </button>

            <button

                onClick={() => setPreview(false)}

                className={`px-4 py-1 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${

                    !preview

                        ? "bg-background text-foreground shadow-xs"

                        : "text-muted-foreground hover:text-foreground"

                }`}

            >

                Edit

            </button>

        </div>

    );

}
