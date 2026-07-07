import { RuntimeDetector } from "./detector";
import { RuntimeMessenger } from "../messaging/messenger";
import { PageInjector } from "../injector/pageInjector";
import { PendingPublishService } from "../services/pendingPublishService";
import { StorageKeys } from "../../shared/storageKeys";
import { RuntimeMessageType } from "../../shared/messageTypes";

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

        // Check for automatic markdown publish pending
        console.log("[Runtime] Checking Pending Documentation");
        const pendingService = new PendingPublishService();
        const pending = await pendingService.getPendingMarkdown();

        if (pending && pending[StorageKeys.PendingMarkdown]) {
            console.log("[Runtime] Pending Documentation Found");

            // 1. Retry loop for Monaco readiness
            let available = false;
            console.log("[Runtime] Waiting For Monaco");
            for (let i = 0; i < 5; i++) {
                available = await this.detector.checkMonaco();
                if (available) {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            if (!available) {
                console.error("[Runtime] Monaco initialization timed out. Aborting injection.");
                return; // Do NOT clear storage
            }

            console.log("[Runtime] Monaco Ready");
            const markdown = pending[StorageKeys.PendingMarkdown];
            console.log("[Runtime] Injecting Documentation");

            // 2. Setup listener for the injection status to conditionally clear storage
            const injectionListener = async (event: MessageEvent) => {
                if (event.source !== window)
                    return;

                const response = event.data;
                if (
                    response &&
                    response.source === "CODEPOST" &&
                    response.type === RuntimeMessageType.INJECTION_STATUS
                ) {
                    window.removeEventListener("message", injectionListener);

                    if (response.success) {
                        console.log("[Runtime] Injection Successful");
                        console.log("[Runtime] Clearing Pending Documentation");
                        await pendingService.clearPendingMarkdown();
                        console.log("[Runtime] Finished");
                    } else {
                        console.error("[Runtime] Markdown injection failed. Keeping pending markdown in storage.");
                    }
                }
            };
            window.addEventListener("message", injectionListener);

            this.messenger.injectMarkdown(markdown);
        } else {
            console.log("[Runtime] No Pending Documentation");
        }
    }
}

