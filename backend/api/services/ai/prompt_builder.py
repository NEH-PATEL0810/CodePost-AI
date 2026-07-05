from .templates import DOCUMENTATION_TEMPLATE

class PromptBuilder:
    @staticmethod
    def build(problem):
        return f"""
{DOCUMENTATION_TEMPLATE}

Problem Title:
{problem.title}

Difficulty:
{problem.difficulty}

Description:
{problem.description}

Examples:
{chr(10).join(problem.examples)}

Constraints:
{chr(10).join(problem.constraints)}

Programming Language:
{problem.language}

User Code:
{problem.code}
"""