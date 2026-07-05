from groq import Groq

from .provider import AIProvider
from .config import AIConfig


class GroqProvider(AIProvider):

    def __init__(self):

        if not AIConfig.API_KEY:
            raise RuntimeError(
                "Missing GROQ_API_KEY"
            )

        self.client = Groq(
            api_key=AIConfig.API_KEY
        )

    def generate(
        self,
        prompt: str,
    ) -> str:

        completion = self.client.chat.completions.create(

            model=AIConfig.MODEL,

            messages=[

                {
                    "role": "user",
                    "content": prompt,
                }

            ],

            temperature=0.3,

        )

        return (
            completion
            .choices[0]
            .message
            .content
        )