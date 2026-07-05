from .context import ProblemData


class MarkdownComposer:
    """
    Responsible for creating the final markdown article.
    """

    def compose(
        self,
        documentation: str,
        problem: ProblemData,
    ) -> str:

        language = self.normalize_language(
            problem.language
        )

        return (
            documentation.strip()
            + "\n\n"
            + "# Code\n\n"
            + f"```{language}\n"
            + problem.code.rstrip()
            + "\n```"
        )

    def normalize_language(
        self,
        language: str,
    ) -> str:

        mapping = {

            "C++": "cpp",

            "Java": "java",

            "Python": "python",

            "Python3": "python",

            "JavaScript": "javascript",

            "TypeScript": "typescript",

            "Go": "go",

            "Rust": "rust",

            "C": "c",

            "C#": "csharp",

            "Kotlin": "kotlin",

            "Swift": "swift",

        }

        return mapping.get(
            language,
            language.lower(),
        )
