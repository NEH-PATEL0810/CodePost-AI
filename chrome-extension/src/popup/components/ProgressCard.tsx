import{
    Progress,
}from "@/components/ui/progress";

interface Props{
    score:number;
}

export function ProgressCard({
    score,
}:Props){
    const percent = (score/7)*100;

    return(
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Extraction</span>
                <span>
                    {score}/7
                </span>
            </div>
            <Progress value={percent} />
        </div>
    )
}