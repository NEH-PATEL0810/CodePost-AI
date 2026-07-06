export class ShareButtonDetector {
    find(): HTMLButtonElement | null {
        console.log("Searching Share button...");
        // Target only interactive elements to prevent matching parent container divs like #__next
        const elements = Array.from(document.querySelectorAll("button, a, [role='button']"));
        const found = elements.find(
            el =>
                el.textContent &&
                el.textContent
                    .trim()
                    .toLowerCase()
                    .includes("share my solution")
        );

        if (found) {
            console.log("Share button found:", found);
            return found as HTMLButtonElement;
        }

        return null;
    }
}
