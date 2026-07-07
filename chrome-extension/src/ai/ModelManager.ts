import type { AIProvider } from "./AIProvider";
import { GroqProvider } from "./GroqProvider";

export class ModelManager {
    private provider: AIProvider;
    private models: string[] = [
        "moonshotai/kimi-k2",
        "qwen/qwen3-32b",
        "openai/gpt-oss-120b"
    ];

    constructor(apiKey?: string) {
        this.provider = new GroqProvider(apiKey);
    }

    async generateDocumentation(prompt: string, onProgress?: (msg: string) => void): Promise<{ markdown: string; model: string }> {
        // Preferred model retrieval (optional caching)
        const cached = await chrome.storage.local.get(["preferredModel", "preferredModelExpiry"]);
        let orderedModels = [...this.models];

        if (cached.preferredModel && typeof cached.preferredModelExpiry === "number" && cached.preferredModelExpiry > Date.now()) {
            console.log(`[ModelManager] Using cached preferred model: ${cached.preferredModel}`);
            orderedModels = [
                cached.preferredModel as string,
                ...this.models.filter(m => m !== cached.preferredModel)
            ];
        }

        let fallbackCount = 0;

        for (const model of orderedModels) {
            // One retry per model (attempt 1 and attempt 2)
            for (let attempt = 1; attempt <= 2; attempt++) {
                try {
                    let progressMsg = "Generating Documentation...\nAnalyzing solution...";
                    if (fallbackCount > 0) {
                        progressMsg = "Generating Documentation...\nComposing explanation...";
                    } else if (attempt === 2) {
                        progressMsg = "Generating Documentation...\nRetrying request...";
                    }
                    
                    if (onProgress) {
                        onProgress(progressMsg);
                    }

                    const markdown = await this.provider.generate(prompt, model);

                    // Success: cache the working model
                    await chrome.storage.local.set({
                        preferredModel: model,
                        preferredModelExpiry: Date.now() + 60 * 60 * 1000 // 1 hour
                    });

                    return {
                        markdown,
                        model
                    };
                } catch (error: any) {
                    console.warn(`[ModelManager] Model ${model} failed on attempt ${attempt}:`, error);

                    // Parse error status
                    const errorMsg = error.message || "";
                    const isApiError = errorMsg.startsWith("API_ERROR:");
                    const status = isApiError ? parseInt(errorMsg.split(":")[1]) : 0;

                    // Non-fallback errors (don't retry or switch model)
                    if (isApiError && (status === 400 || status === 401 || status === 403)) {
                        console.error(`[ModelManager] Non-transient error ${status}. Aborting.`);
                        throw new Error(`Generation failed: ${errorMsg}`);
                    }

                    // Optimization: Skip retry on timeout or network failure to save time
                    if (status === 408 || errorMsg === "NETWORK_FAILURE") {
                        console.log("[ModelManager] Timeout/Network error. Skipping retry to proceed faster.");
                        attempt = 2; // Fast-forward to skip attempt 2
                    }

                    // If this is the final attempt for this model, fallback to the next model
                    if (attempt === 2) {
                        fallbackCount++;
                        if (onProgress) {
                            onProgress("Generating Documentation...\nConnecting to backup server...");
                        }
                        await new Promise(resolve => setTimeout(resolve, 500)); // Short delay for transparency
                    }
                }
            }
        }

        throw new Error("All models failed.");
    }

    private getFriendlyName(model: string): string {
        if (model.includes("kimi")) return "Kimi K2";
        if (model.includes("qwen")) return "Qwen3";
        if (model.includes("gpt")) return "GPT-OSS";
        return model;
    }
}
