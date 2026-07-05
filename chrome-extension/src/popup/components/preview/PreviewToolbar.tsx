import { Button } from "@/components/ui/button";
import { RegenerateButton } from "./RegenerateButton";

export function PreviewToolbar() {

    return (

        <div className="flex gap-2">

            <RegenerateButton />

            <Button>

                Publish

            </Button>

        </div>

    );

}
