export const SESSION_KEYS = {
    PENDING_MARKDOWN: "pending_markdown",
    PENDING_TITLE: "pending_title",
    PENDING_PROBLEM: "pending_problem",
} as const;

/**
 * Sets the pending markdown in session storage.
 */
export async function setPendingMarkdown(markdown: string): Promise<void> {
    await chrome.storage.session.set({ [SESSION_KEYS.PENDING_MARKDOWN]: markdown });
}

/**
 * Gets the pending markdown from session storage.
 */
export async function getPendingMarkdown(): Promise<string | undefined> {
    const result = await chrome.storage.session.get(SESSION_KEYS.PENDING_MARKDOWN);
    return result[SESSION_KEYS.PENDING_MARKDOWN] as string | undefined;
}

/**
 * Clears the pending markdown from session storage.
 */
export async function clearPendingMarkdown(): Promise<void> {
    await chrome.storage.session.remove(SESSION_KEYS.PENDING_MARKDOWN);
}
