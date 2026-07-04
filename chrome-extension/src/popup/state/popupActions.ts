export const PopupAction = {
        CHECKING_PAGE: "CHECKING_PAGE",
        UNSUPPORTED: "UNSUPPORTED",
        EXTRACTING: "EXTRACTING",
        READY: "READY",
        GENERATING: "GENERATING",
        ERROR: "ERROR",
} as const;

export type PopupAction = typeof PopupAction[keyof typeof PopupAction];