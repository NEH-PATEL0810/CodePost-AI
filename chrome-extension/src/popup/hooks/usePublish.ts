import { useDocument } from "../context/DocumentContext";

import { publishMarkdown } from "../services/publish";

import { useCurrentTab } from "./useCurrenttab";

export function usePublish() {

    const {

        document,

    } = useDocument();

    const tab = useCurrentTab();

    async function publish() {

        if (

            !document ||

            !tab?.id

        )

            throw new Error("No active document or tab found.");

        console.log("Publishing...");

        return await publishMarkdown(

            tab.id,

            document.currentMarkdown,

        );

    }

    return {

        publish,

    };

}
