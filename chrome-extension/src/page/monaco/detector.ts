export class MonacoDetector {
    isAvailable(): boolean {
        return typeof (window as any).monaco !== "undefined";
    }
}
