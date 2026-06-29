export interface UserSettings {
    theme: "light" | "dark";
    aiProvider: "gemini";
}

export interface HistoryItem{
    id:string;
    title:string;
    generatedAt: string;
}

