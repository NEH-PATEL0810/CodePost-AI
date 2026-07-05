export function getConstraintsList(): HTMLUListElement | null {
    const headings = Array.from(
        document.querySelectorAll("strong")
    );

    const heading = headings.find(node =>
        node.textContent?.trim().startsWith("Constraints")
    );

    if (!heading) {
        return null;
    }

    let current: Element | null = heading.parentElement;

    while (current) {
        current = current.nextElementSibling;

        if (!current) {
            break;
        }

        if (current.tagName === "UL") {
            return current as HTMLUListElement;
        }

        if (
            current.querySelector("strong")
        ) {
            break;
        }
    }

    return null;
}