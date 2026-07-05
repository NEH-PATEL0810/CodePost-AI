class DocumentationGenerator:
    def generate(self, data):
        code = data.get("code")

        if not code:
            code = "Code extraction unavailable."

        return {
            "markdown": f"""# {data['title']}

Difficulty: {data['difficulty']}

Language: {data['language']}

This is a mock response from Django.

OpenRouter integration comes later.
""",
            "metadata": {
                "provider": "mock",
                "version": "0.1"
            }
        }
