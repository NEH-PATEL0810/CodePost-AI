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
        self.model = AIConfig.MODEL

    def generate(self, prompt: str) -> str:
        """
        Generate markdown documentation from the prompt.
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                temperature=0.2,
                max_tokens=900,
                top_p=0.9,
                messages=[
                    {
                        "role": "user",
                        "content": prompt,
                    }
                ],
            )

            markdown = response.choices[0].message.content

            if not markdown:
                raise RuntimeError("Groq returned an empty response.")

            markdown = markdown.strip()

            noise = [
                "Sure!",
                "Certainly!",
                "Here is",
                "Here's",
                "Of course!",
            ]

            for prefix in noise:
                if markdown.startswith(prefix):
                    first_heading = markdown.find("# ")
                    if first_heading != -1:
                        markdown = markdown[first_heading:]

            return markdown

        except Exception as e:
            raise RuntimeError(f"Groq generation failed: {e}")