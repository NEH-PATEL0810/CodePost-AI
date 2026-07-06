export function getAllButtons(): HTMLButtonElement[] {
    return Array.from(
        document.querySelectorAll("button")
    );
}
