export class MarkdownWriter {
    write(
        model: any,
        markdown: string
    ): boolean {
        console.log(
            "[Writer] Starting Injection..."
        );

        if (!model) {
            console.error(
                "[Writer] Model missing."
            );
            return false;
        }

        try {
            const before =
                model.getValue();

            console.log(
                "[Writer] Previous Length:",
                before.length
            );

            model.setValue(markdown);

            const after =
                model.getValue();

            console.log(
                "[Writer] Current Length:",
                after.length
            );

            if (after === markdown) {
                console.log(
                    "[Writer] Injection Successful."
                );
                return true;
            }

            console.error(
                "[Writer] Verification Failed."
            );
            return false;
        }
        catch (error) {
            console.error(
                "[Writer] Injection Error",
                error
            );
            return false;
        }
    }
}
