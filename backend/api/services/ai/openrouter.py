from .provider import AIProvider
class OpenRouterProvider(AIProvider):
    def generate(self,prompt:str) -> str:
        return """
        # Intuition

Mock Intuition

# Approach

Mock Approach

# Complexity Analysis

- Time: O(n)

- Space: O(n)

# Code Explanation

Mock explanation.
"""