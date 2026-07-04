import type { ProblemData } from "@/core/types/problem";

export async function generateDocumentation(problem:ProblemData):Promise<string>{
    await new Promise(resolve=> setTimeout(resolve,1800));

    return `# ${problem.title} 
    Difficulty: ${problem.difficulty}
    Language: ${problem.language}
    This is a mock documentation preview.
    `
}