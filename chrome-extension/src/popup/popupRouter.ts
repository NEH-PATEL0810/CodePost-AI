import { RuntimeBridge } from "./services/runtimeBridge";

export class PopupRouter {
    private bridge = new RuntimeBridge();

    async request(payload: any): Promise<any> {
        return this.bridge.send(payload);
    }
}
