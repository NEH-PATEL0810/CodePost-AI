import { RuntimeDetector } from "./detector";
import { RuntimeMessenger } from "../messaging/messenger";
import { PageInjector } from "../injector/pageInjector";

export class NavigationBridge {

    detector = new RuntimeDetector();

    messenger = new RuntimeMessenger();

    injector = new PageInjector();

    async initialize() {

        console.log("[Bridge] Initializing");

        this.injector.inject();

        await new Promise(resolve =>
            setTimeout(resolve, 1000)
        );

        const available =
            await this.detector.checkMonaco();

        console.log(
            "[Bridge] Monaco Available:",
            available
        );

        this.messenger.startHeartbeat();

    }

}

