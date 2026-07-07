import { RuntimeMessenger } from "../messenger";

export async function pingHandler(): Promise<void> {
    console.log("[Handler] Ping");
    RuntimeMessenger.sendPong();
}
