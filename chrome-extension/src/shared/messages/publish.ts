export const PublishMessage = {
    PUBLISH_MARKDOWN: "PUBLISH_MARKDOWN",
} as const;

export type PublishMessage = typeof PublishMessage[keyof typeof PublishMessage];
