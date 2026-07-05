from .validator import ResponseValidator

validator = ResponseValidator()


def test(markdown: str, title: str):

    print("=" * 60)
    print(title)
    print("=" * 60)

    result = validator.validate(markdown)

    print("Valid :", result.valid)
    print("Errors:", result.errors)

    print("=" * 60)
