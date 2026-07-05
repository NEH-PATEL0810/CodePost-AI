import re
from .prompt_builder import PromptBuilder
from .context import ProblemData
from .groq import GroqProvider
from .validator import ResponseValidator
from .composer import MarkdownComposer
from .code_validator import CodeValidator

class GenerationService:
    def __init__(self):
        self.provider = GroqProvider()
        self.builder = PromptBuilder()
        self.validator = ResponseValidator()
        self.composer = MarkdownComposer()
        self.code_validator = CodeValidator()
    
    def generate(self, problem):
        if isinstance(problem, dict):
            problem = ProblemData(**problem)
        
        valid, message = self.code_validator.validate(problem)
        if not valid:
            raise RuntimeError(message)

        prompt = self.builder.build(problem)
        markdown = self.provider.generate(prompt)

        print("=" * 70)
        print("Groq Markdown")
        print("=" * 70)
        print(markdown[:1000])

        if len(markdown) > 1000:
            print("...truncated...")

        print("=" * 70)

        result = self.validator.validate(markdown)

        print("\n" + "=" * 60)
        print("AI Validation")
        print("=" * 60)
        print("Valid :", result.valid)
        print("Errors:", result.errors)
        print("=" * 60 + "\n")

        if not result.valid:
            raise RuntimeError("\n".join(result.errors))

        final_markdown = self.composer.compose(
            documentation=result.markdown,
            problem=problem,
        )

        print("\n")
        print("=" * 60)
        print("Markdown Composer")
        print("=" * 60)
        print(final_markdown)
        print("=" * 60)

        return final_markdown