import { Button } from "@/components/ui/button";

export function PreviewToolbar() {

    return (

        <div className="flex gap-2">

            <Button>

                Regenerate

            </Button>

            <Button variant="outline">

                Edit

            </Button>

            <Button variant="outline">

                Score

            </Button>

            <Button>

                Publish

            </Button>

        </div>

    );

}
