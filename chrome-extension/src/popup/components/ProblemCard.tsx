import type { ProblemData} from "@/core/types/problem";

import { Card,CardContent} from "@/components/ui/card";

import {DifficultyBadge} from "./DifficultyBadge";

import {LanguageBadge} from "./LanguageBadge";

import {ProgressCard} from "./ProgressCard";

import {GenerateButton} from "./GenerateButton";

interface Props {
    problem: ProblemData;
    generate: (problem: ProblemData) => void;
}

export function ProblemCard({
    problem,
    generate,
}: Props) {

    const score = [
        problem.title,
        problem.difficulty,
        problem.description,
        problem.examples.length,
        problem.constraints.length,
        problem.language,
        problem.code,
    ].filter(Boolean).length;

    return (
        <Card>
            <CardContent className="space-y-5 pt-6">
                <div>
                    <h2 className="text-lg font-bold">
                        📘 {problem.title}
                    </h2>
                </div>
                <div className="flex gap-2">
                    <DifficultyBadge
                        difficulty={problem.difficulty}
                    />
                    <LanguageBadge
                        language={problem.language}
                    />
                </div>
                <ProgressCard
                    score={score}
                />
                <GenerateButton
                    onClick={() => generate(problem)}
                />
            </CardContent>
        </Card>

    );

}