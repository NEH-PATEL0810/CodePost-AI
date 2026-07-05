import os

from dotenv import load_dotenv

load_dotenv()


class AIConfig:
    """
    Centralized AI configuration.
    """

    API_KEY = os.getenv(
        "GROQ_API_KEY",
        "",
    )

    MODEL = os.getenv(
        "GROQ_MODEL",
        "llama-3.3-70b-versatile",
    )

    TEMPERATURE = float(
        os.getenv(
            "GROQ_TEMPERATURE",
            "0.2",
        )
    )

    MAX_TOKENS = int(
        os.getenv(
            "GROQ_MAX_TOKENS",
            "2500",
        )
    )

    APP_NAME = os.getenv(
        "APP_NAME",
        "CodePost AI",
    )

    @classmethod
    def validate(cls):

        if not cls.API_KEY:
            raise RuntimeError(
                "Missing GROQ_API_KEY"
            )