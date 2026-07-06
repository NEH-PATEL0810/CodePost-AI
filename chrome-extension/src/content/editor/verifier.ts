export class EditorVerifier {

    verify(

        editor: HTMLElement,

        markdown: string,

    ) {

        const isVerified = (

            editor.innerText.trim()

            ===

            markdown.trim()

        );

        if (isVerified) {
            console.log("Verified.");
        }

        return isVerified;

    }

}
