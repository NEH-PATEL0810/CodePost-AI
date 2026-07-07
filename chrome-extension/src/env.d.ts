interface ImportMetaEnv {
    readonly VITE_API_URL:string;
    readonly VITE_APP_NAME:string;
}

interface ImportMeta{
    readonly env:ImportMetaEnv;
}

declare module "*?script" {
    const value: string;
    export default value;
}