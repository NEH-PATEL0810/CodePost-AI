from api.services.ai.prompt_builder import PromptBuilder
from api.services.ai.groq import GroqProvider
from api.services.ai.context import ProblemData


class GenerationService:

    def __init__(self):

        self.provider = GroqProvider()

        self.builder = PromptBuilder()

    def generate(self, problem):
        if isinstance(problem, dict):
            problem = ProblemData(**problem)

        prompt = self.builder.build(problem)

        print("=" * 60)

        print("Building Prompt")

        print("=" * 60)

        print(prompt)

        print("=" * 60)

        print("=" * 60)

        print("Sending Prompt To Groq")

        print("=" * 60)

        markdown = self.provider.generate(prompt)

        print("=" * 60)

        print("Groq Response")

        print("=" * 60)

        print(markdown)

        return markdown
