import type { AIProvider } from "./AIProvider";

export class GroqProvider implements AIProvider {
    private apiKey: string;
    private baseUrl: string;

    constructor(
        apiKey: string = import.meta.env.VITE_OPENROUTER_API_KEY || "",
        baseUrl: string = import.meta.env.VITE_OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1"
    ) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async generate(prompt: string, model: string): Promise<string> {
        const url = `${this.baseUrl}/chat/completions`;

        console.log(`[GroqProvider] Sending request to model: ${model}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

        let response: Response;
        try {
            response = await fetch(url, {
                method: "POST",
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                    "HTTP-Referer": "https://github.com/google-deepmind/codepost",
                    "X-Title": "CodePost AI"
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.3
                })
            });
        } catch (err: any) {
            if (err.name === 'AbortError') {
                console.error(`[GroqProvider] Request timed out for model: ${model}`);
                throw new Error("API_ERROR:408"); // 408 Request Timeout
            }
            console.error("[GroqProvider] Network connection failed:", err);
            throw new Error("NETWORK_FAILURE");
        } finally {
            clearTimeout(timeoutId);
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[GroqProvider] API Error Response:`, errorText);
            console.error(`[GroqProvider] API Error: ${response.status} ${response.statusText}`);
            throw new Error(`API_ERROR:${response.status}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error("EMPTY_RESPONSE");
        }

        return content;
    }
}
