import { MonacoDetector } from "../detector";
import { RuntimeMessenger } from "../messenger";

const detector = new MonacoDetector();

export async function monacoHandler(): Promise<void> {
    console.log("[Handler] Checking Monaco");
    const available = detector.isAvailable();
    RuntimeMessenger.sendMonacoStatus(available);
}
