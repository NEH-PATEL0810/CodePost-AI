import { BridgeDetector } from "./detector";
import { PageInjector } from "./pageInjector";
import { BridgeLoader } from "./loader";
import { EditorManager } from "../editorManager";
import { Cleanup } from "./cleanup";

export class NavigationBridge {
    detector = new BridgeDetector();
    injector = new PageInjector();
    loader = new BridgeLoader();
    manager = new EditorManager();
    cleanup = new Cleanup();

    async initialize() {
        if (!this.detector.isPostSolutionPage())
            return;

        this.injector.inject();

        const data = await this.loader.load();

        await this.manager.load(
            data.pending_markdown
        );

        await this.cleanup.clear();
    }
}
