import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";

interface Props{
    language:string;
}

export function LanguageBadge({
    language,
}: Props){
    return(
        <Badge variant ="secondary" className="gap-1">
            <Code2 size={14} />
            {language}
        </Badge>
    )
}