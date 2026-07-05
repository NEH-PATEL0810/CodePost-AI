from .prompt_builder import PromptBuilder
from .context import ProblemData
from .groq import GroqProvider

class GenerationService:
    def __init__(self):
        self.provider = GroqProvider()
    
    def generate(self, problem):
        if isinstance(problem, dict):
            problem = ProblemData(**problem)
        prompt = PromptBuilder.build(problem)
        return self.provider.generate(prompt)