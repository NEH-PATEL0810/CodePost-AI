import { Button } from "@/components/ui/button";

interface Props {

    onReset: () => void;

}

export function EditorActions({

    onReset,

}: Props) {

    return (

        <Button

            variant="outline"

            onClick={onReset}

        >

            Reset Changes

        </Button>

    );

}
