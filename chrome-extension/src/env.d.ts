interface ImportMetaEnv {
    readonly VITE_API_URL:string;
    readonly VITE_APP_NAME:string;
    readonly VITE_OPENROUTER_API_KEY:string;
    readonly VITE_OPENROUTER_BASE_URL:string;
}

interface ImportMeta{
    readonly env:ImportMetaEnv;
}

declare module "*?script" {
    const value: string;
    export default value;
}