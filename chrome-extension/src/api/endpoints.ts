const BASE = import.meta.env.VITE_API_URL;

export const API = {
    BASE_URL: `${BASE}api`,

    HEALTH: "/health/",

    GENERATE: "/generate/",
} as const;