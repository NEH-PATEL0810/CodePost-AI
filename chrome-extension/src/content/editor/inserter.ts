export class EditorInserter {

    insert(

        editor: HTMLElement,

        markdown: string,

    ) {

        editor.focus();

        document.execCommand(

            "selectAll"

        );

        document.execCommand(

            "delete"

        );

        document.execCommand(

            "insertText",

            false,

            markdown,

        );

        console.log("Markdown inserted.");

    }

}
