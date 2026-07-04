import {
Card,
CardContent,
} from "@/components/ui/card";

export function UnsupportedCard(){
return(
<Card>
<CardContent className="py-6 text-center">
<h2 className="font-semibold">
Unsupported Page
</h2>
<p className="mt-2 text-sm text-muted-foreground">
Open any LeetCode problem to generate documentation.
</p>
</CardContent>
</Card>
);
}