from groq import Groq

from .provider import AIProvider
from .config import AIConfig


class GroqProvider(AIProvider):
    """
    Concrete AI provider backed by the Groq API.
    """

    def __init__(self) -> None:
        AIConfig.validate()

        self.client = Groq(
            api_key=AIConfig.API_KEY
        )

    def generate(self, prompt: str) -> str:
        """
        Generate markdown documentation from the prompt.
        """
        try:
            response = self.client.chat.completions.create(
                model=AIConfig.MODEL,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are an expert technical writer. "
                            "Explain ONLY the user's accepted solution. "
                            "Return valid GitHub-flavored Markdown."
                        ),
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
                temperature=AIConfig.TEMPERATURE,
                max_completion_tokens=AIConfig.MAX_TOKENS,
            )

            content = response.choices[0].message.content

            if not content:
                raise RuntimeError("Groq returned an empty response.")

            return content

        except Exception as e:
            raise RuntimeError(f"Groq generation failed: {e}")