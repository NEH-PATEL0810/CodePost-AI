export function isValidCode(code: string): boolean {
    if (!code.trim()) {
        return false;
    }

    if (code.length < 20) {
        return false;
    }

    return true;
}
