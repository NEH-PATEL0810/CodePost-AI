import { EditorDetector } from "./detector";
import { EditorInserter } from "./inserter";
import { EditorVerifier } from "./verifier";

export class LeetCodeEditorAdapter {

    detector =

        new EditorDetector();

    inserter =

        new EditorInserter();

    verifier =

        new EditorVerifier();

    publish(

        markdown: string,

    ) {

        const editor =

            this.detector.findEditor();

        if (!editor)

            throw new Error(

                "Solution editor not found."

            );

        this.inserter.insert(

            editor,

            markdown,

        );

        const success =

            this.verifier.verify(

                editor,

                markdown,

            );

        if (!success)

            throw new Error(

                "Verification failed."

            );

        return true;

    }

}
