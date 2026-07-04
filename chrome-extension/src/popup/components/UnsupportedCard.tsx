import { TriangleAlert } from "lucide-react";

export function UnsupportedCard(){
return(
 <div className="py-10 text-center">

            <TriangleAlert
                className="mx-auto mb-3"

            />

            <h2 className="font-semibold">

                Unsupported Page

            </h2>

            <p className="text-sm text-muted-foreground mt-2">

                Open a LeetCode problem page to continue.

            </p>

        </div>

);
}