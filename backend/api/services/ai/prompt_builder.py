from .prompt_rules import DOCUMENTATION_RULES
from .constants import PROMPT_VERSION

class PromptBuilder:
    @staticmethod
    def build(problem):
        parts = [
            DOCUMENTATION_RULES,
            "",
            f"Problem Title:\n{problem.title}",
            "",
            f"Difficulty:\n{problem.difficulty}",
            "",
            f"Description:\n{problem.description}",
            "",
            "Examples:",
            *problem.examples,
            "",
            "Constraints:",
            *problem.constraints,
            "",
            f"Programming Language:\n{problem.language}",
            "",
            "User Code:",
            problem.code,
        ]
        parts.append("")
        parts.append(f"Prompt Version: {PROMPT_VERSION}")
        return "\n".join(parts)