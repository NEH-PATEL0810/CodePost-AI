from .prompt_builder import PromptBuilder
from .openrouter import OpenRouterProvider

class GenerationService:
    def __init__(self):
        self.provider = OpenRouterProvider()
    
    def generate(self,problem):
        prompt = PromptBuilder.build(problem)
        return self.provider.generate(prompt)