import type{
    ProblemData
} from "@/core/types/problem";

interface Props{
    problem:ProblemData;
}

export function ProblemCard({
    problem,
}:Props){
    return(
        <div>
            <h2>
                {problem.title}
            </h2>
            <p>
                {problem.difficulty}
            </p>
        </div>
    );
}