from groq import Groq, APIConnectionError, RateLimitError, APITimeoutError

from .provider import AIProvider
from .config import AIConfig
from .exceptions import (
    AIRateLimitError,
    AIUnavailableError,
    AIEmptyResponseError,
    AITimeoutError,
)


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
        except RateLimitError:
            raise AIRateLimitError(
                "Groq rate limit exceeded."
            )
        except APITimeoutError:
            raise AITimeoutError(
                "Groq request timed out."
            )
        except APIConnectionError:
            raise AIUnavailableError(
                "Unable to connect to Groq."
            )

        markdown = response.choices[0].message.content

        if not markdown or not markdown.strip():
            raise AIEmptyResponseError(
                "Groq returned an empty response."
            )

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