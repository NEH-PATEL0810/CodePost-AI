export interface AIProvider {
    generate(prompt: string, model: string): Promise<string>;
}
