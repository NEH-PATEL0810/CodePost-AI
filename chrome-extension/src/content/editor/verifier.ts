export class MonacoVerifier {
    verify(): boolean {
        const textarea = document.querySelector("textarea");
        if (!textarea) return false;
        return textarea.value.length > 50;
    }
}
