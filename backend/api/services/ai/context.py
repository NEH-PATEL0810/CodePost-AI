from typing import List
from dataclasses import dataclass

@dataclass
class ProblemData:
    title: str
    difficulty: str
    description: str
    examples: List[str]
    constraints: List[str]
    language: str
    code: str
    url: str

@dataclass
class GenerationContext:
    problem: ProblemData
