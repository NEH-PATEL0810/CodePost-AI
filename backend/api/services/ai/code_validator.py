import re

from .context import ProblemData


class CodeValidator:
    """
    Validates whether the extracted code appears to be
    an actual solution instead of an editor template.
    """

    MIN_NON_EMPTY_LINES = 5

    def validate(self, problem: ProblemData) -> tuple[bool, str]:

        code = (problem.code or "").strip()

        if not code:
            return False, "No code was extracted."

        lines = [
            line.strip()
            for line in code.splitlines()
            if line.strip()
        ]

        # Very small code is almost always a template
        if len(lines) < self.MIN_NON_EMPTY_LINES:
            return False, "Solution appears incomplete."

        joined = "\n".join(lines)

        # Placeholder / boilerplate patterns
        boilerplate_patterns = [
            r"pass\s*$",
            r"TODO",
            r"FIXME",
        ]

        for pattern in boilerplate_patterns:
            if re.search(pattern, joined, re.IGNORECASE):
                return False, "Boilerplate code detected."

        # Language-specific empty function detection
        if problem.language.startswith("Python"):

            # Only class + function signature
            if re.fullmatch(
                r"class\s+Solution:.*def\s+\w+\(.*\):(\s*)?",
                joined,
                re.DOTALL,
            ):
                return False, "Python solution is empty."

        if problem.language == "C++":

            # Detect empty function body {} (ignoring standard initializer lists like return {};)
            if re.search(
                r"\b(?!if\b|for\b|while\b|switch\b|catch\b)\w+\s*\([^)]*\)\s*(?:const\s+)?(?:override\s+)?\{\s*\}",
                joined,
                re.DOTALL,
            ):
                return False, "C++ solution body is empty."

        if problem.language == "Java":

            if re.search(
                r"\b(?!if\b|for\b|while\b|switch\b|catch\b)\w+\s*\([^)]*\)\s*(?:const\s+)?(?:override\s+)?\{\s*\}",
                joined,
                re.DOTALL,
            ):
                return False, "Java solution body is empty."

        return True, ""
