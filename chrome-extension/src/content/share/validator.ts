export class ShareButtonValidator {
    isShareButton(button: HTMLButtonElement): boolean {
        const text =
            button.textContent
                ?.replace(/\s+/g, " ")
                .trim()
                .toLowerCase() ?? "";

        return text.includes("share");
    }
}
