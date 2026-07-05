from .prompt_builder import PromptBuilder
from .context import ProblemData
from .groq import GroqProvider
from .validator import ResponseValidator

class GenerationService:
    def __init__(self):
        self.provider = GroqProvider()
        self.builder = PromptBuilder()
        self.validator = ResponseValidator()
    
    def generate(self, problem):
        if isinstance(problem, dict):
            problem = ProblemData(**problem)
        prompt = self.builder.build(problem)
        markdown = self.provider.generate(prompt)
        result = self.validator.validate(markdown)

        print("\n" + "=" * 60)
        print("AI Validation")
        print("=" * 60)
        print("Valid :", result.valid)
        print("Errors:", result.errors)
        print("=" * 60 + "\n")

        if not result.valid:
            raise RuntimeError("\n".join(result.errors))

        return result.markdown