export class EditorDetector {

    findEditor():

        HTMLElement | null {

        // Current LeetCode markdown editor

        const editor =

            document.querySelector(

                '[contenteditable="true"]'

            );

        if (editor) {
            console.log("Editor detected.");
        }

        return editor as HTMLElement | null;

    }

}
