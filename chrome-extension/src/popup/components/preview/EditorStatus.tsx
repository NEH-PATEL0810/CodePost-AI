interface Props {

    edited: boolean;

}

export function EditorStatus({

    edited,

}: Props) {

    return (

        <div className="text-xs text-muted-foreground">

            {edited

                ? "● Edited"

                : "Original AI Output"}

        </div>

    );

}
