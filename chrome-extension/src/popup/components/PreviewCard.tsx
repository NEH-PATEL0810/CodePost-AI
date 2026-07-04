import { Card, CardContent } from "@/components/ui/card";

interface Props {
    markdown: string;
}

export function PreviewCard({
    markdown,
}: Props) {
    return (
        <Card>
            <CardContent className="pt-5">
                <pre className="whitespace-pre-wrap text-sm">
                    {markdown}
                </pre>
            </CardContent>
        </Card>
    );
}