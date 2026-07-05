from dataclasses import dataclass,field

@dataclass
class ValidationResult:
    """
    Result of validating AI-generated markdown.
    """

    valid:bool
    markdown:str
    errors:list[str]=field(default_factory=list)

