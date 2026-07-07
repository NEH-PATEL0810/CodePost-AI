export class BridgeDetector {
    isPostSolutionPage(): boolean {
        console.log("[Bridge] Checking page");
        return location.pathname.includes("post-solution");
    }
}
