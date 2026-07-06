import { RegenerateButton } from "./RegenerateButton";
import { PublishButton } from "./PublishButton";

export function PreviewToolbar() {

    return (

        <div className="flex gap-2">

            <RegenerateButton />

            <PublishButton />

        </div>

    );

}
