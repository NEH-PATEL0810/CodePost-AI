import { PublishMessage } from "@/shared/messages/publish";
import { SESSION_KEYS } from "@/shared/storage/publish";

export async function publishMarkdown(

    tabId: number,

    markdown: string,

    title: string,

    problemUrl: string,

) {

    await chrome.storage.session.set({

        [SESSION_KEYS.PENDING_MARKDOWN]:

            markdown,

        [SESSION_KEYS.PENDING_TITLE]:

            title,

        [SESSION_KEYS.PENDING_PROBLEM]:

            problemUrl,

    });

    return chrome.tabs.sendMessage(

        tabId,

        {

            type:

                PublishMessage.PUBLISH_MARKDOWN,

            markdown,

        }

    );

}
