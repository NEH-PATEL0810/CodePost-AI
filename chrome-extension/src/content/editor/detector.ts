export class MonacoDetector {
    isReady(): boolean {
        return !!(
            (window as any).monaco &&
            (window as any).monaco.editor
        );
    }
}
