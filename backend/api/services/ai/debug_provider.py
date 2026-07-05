from .groq import GroqProvider

provider = GroqProvider()

result = provider.generate(
    """
Explain the following C++ solution.

class Solution {
public:
    int add(int a, int b){
        return a+b;
    }
};
"""
)

print(result)
