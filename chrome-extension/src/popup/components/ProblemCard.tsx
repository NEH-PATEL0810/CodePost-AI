import type { ProblemData} from "@/core/types/problem";

import { Card,CardContent} from "@/components/ui/card";

import {DifficultyBadge} from "./DifficultyBadge";

import {LanguageBadge} from "./LanguageBadge";

import {ProgressCard} from "./ProgressCard";

import {GenerateButton} from "./GenerateButton";

import { useState } from "react";
import { PopupRouter } from "../popupRouter";
import { PopupMessageType } from "@/shared/popupMessages";

interface Props {
    problem: ProblemData;
    generate: (problem: ProblemData) => void;
}

export function ProblemCard({
    problem,
    generate,
}: Props) {
    const [testResponse, setTestResponse] = useState<{ version?: string; success?: boolean } | null>(null);
    const [testing, setTesting] = useState(false);

    const handleTest = async () => {
        setTesting(true);
        console.log("[Popup]\nSending REQUEST");
        try {
            const popupRouter = new PopupRouter();
            const res = await popupRouter.request({
                source: "CODEPOST",
                type: PopupMessageType.REQUEST,
                payload: {}
            });
            console.log("[Popup]\nResponse Received\n↓", res);
            setTestResponse(res);
        } catch (err) {
            console.error("Test failed", err);
            setTestResponse({ success: false });
        } finally {
            setTesting(false);
        }
    };

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

                <div className="pt-4 border-t border-muted">
                    <button
                        onClick={handleTest}
                        disabled={testing}
                        className="w-full py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-semibold hover:bg-secondary/80 disabled:opacity-50"
                    >
                        {testing ? "Testing..." : "Test Runtime"}
                    </button>
                    {testResponse && (
                        <div className="mt-3 p-3 bg-muted rounded-md text-xs font-mono space-y-1">
                            <div>Version: {testResponse.version || "N/A"}</div>
                            <div>Status: {testResponse.success ? "Success" : "Failed"}</div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}