from typing import TypedDict, List

class ProblemData(TypedDict):
    title: str
    difficulty: str
    description: str
    examples: List[str]
    constraints: List[str]
    language: str
    code: str
    url: str

class GenerationContext(TypedDict):
    problem: ProblemData
