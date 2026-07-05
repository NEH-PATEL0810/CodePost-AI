from .config import AIConfig


def print_ai_configuration():

    print("=" * 50)

    print("AI Configuration")

    print("=" * 50)

    print("Model:", AIConfig.MODEL)

    print("Temperature:", AIConfig.TEMPERATURE)

    print("Max Tokens:", AIConfig.MAX_TOKENS)

    print("API Key Loaded:", bool(AIConfig.API_KEY))

    print("=" * 50)
