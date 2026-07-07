import { RuntimeDetector } from "./detector";
import { PageInjector } from "../injector/pageInjector";

export class NavigationBridge {

    detector = new RuntimeDetector();

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

    }

}
