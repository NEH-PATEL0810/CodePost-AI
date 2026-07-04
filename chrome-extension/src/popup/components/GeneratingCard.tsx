import { LoaderCircle } from "lucide-react";

export function GeneratingCard() {

    return (

        <div className="py-10 text-center">
            <LoaderCircle
                className="mx-auto mb-4 animate-spin"
            />
            <p>
               CodePost AI is generating documentation...
            </p>

        </div>

    );

}