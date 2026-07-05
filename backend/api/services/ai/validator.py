import re

from .models import ValidationResult


class ResponseValidator:

    REQUIRED_HEADERS = [

        "# Intuition",

        "# Approach",

        "# Complexity Analysis",

        "# Code Explanation",

    ]

    FORBIDDEN_HEADERS = [

        "# Code",

        "# Solution",

        "# Implementation",

    ]

    MIN_LENGTH = 100

    def clean(
        self,
        markdown: str,
    ) -> str:

        markdown = markdown.replace(
            "\r\n",
            "\n",
        )

        markdown = re.sub(
            r"\n{3,}",
            "\n\n",
            markdown,
        )

        first_heading = markdown.find("# ")

        if first_heading != -1:
            markdown = markdown[first_heading:]

        return markdown.strip()

    def validate(
        self,
        markdown: str,
    ) -> ValidationResult:

        markdown = self.clean(markdown)

        if not markdown:
            return ValidationResult(
                valid=False,
                markdown=markdown,
                errors=["Empty response."]
            )

        if markdown.startswith("{"):
            return ValidationResult(
                valid=False,
                markdown=markdown,
                errors=["JSON detected instead of Markdown."]
            )

        if "<html" in markdown.lower():
            return ValidationResult(
                valid=False,
                markdown=markdown,
                errors=["Unexpected HTML detected."]
            )

        errors = []

        for section in self.REQUIRED_HEADERS:

            if section not in markdown:

                errors.append(
                    f"Missing section: {section}"
                )

        for forbidden in self.FORBIDDEN_HEADERS:
            header_name = forbidden.lstrip("#").strip()
            pattern = rf"^\s*#+\s*{re.escape(header_name)}\s*$"
            if re.search(pattern, markdown, re.MULTILINE | re.IGNORECASE):
                errors.append(
                    f"Unexpected section: {forbidden}"
                )

        if len(markdown) < self.MIN_LENGTH:
            errors.append(
                "Documentation too short."
            )

        if "Time" not in markdown:
            errors.append(
                "Missing Time Complexity."
            )

        if "Space" not in markdown:
            errors.append(
                "Missing Space Complexity."
            )

        return ValidationResult(

            valid=len(errors) == 0,

            markdown=markdown,

            errors=errors,

        )