import type { ProblemData } from "@/core/types/problem";
import { PromptBuilder } from "@/ai/PromptBuilder";
import { ModelManager } from "@/ai/ModelManager";
import type { GeneratedSolution } from "../types/generation";

function normalizeLanguage(language: string): string {
    const mapping: Record<string, string> = {
        "C++": "cpp",
        "Java": "java",
        "Python": "python",
        "Python3": "python",
        "JavaScript": "javascript",
        "TypeScript": "typescript",
        "Go": "go",
        "Rust": "rust",
        "C": "c",
        "C#": "csharp",
        "Kotlin": "kotlin",
        "Swift": "swift",
    };
    return mapping[language] || language.toLowerCase();
}

function composeMarkdown(documentation: string, problem: ProblemData): string {
    const lang = normalizeLanguage(problem.language);
    return (
        documentation.trim() +
        "\n\n" +
        "# Code\n\n" +
        `\`\`\`${lang}\n` +
        problem.code.trim() +
        "\n\`\`\`\n\n" +
        "---\n" +
        "_*Generated with [CodePost AI](https://github.com) 🚀_"
    );
}

export async function generateDocumentation(
    problem: ProblemData,
    onProgress?: (msg: string) => void
): Promise<GeneratedSolution> {
    const prompt = PromptBuilder.build(problem);

    console.log("[generateDocumentation] Prompt built successfully. Length:", prompt.length);

    const manager = new ModelManager();
    const result = await manager.generateDocumentation(prompt, onProgress);

    const composedMarkdown = composeMarkdown(result.markdown, problem);

    return {
        markdown: composedMarkdown,
        metadata: {
            generatedAt: Date.now(),
            model: result.model,
            provider: "OpenRouter",
            version: "1.0.0"
        }
    };
}
