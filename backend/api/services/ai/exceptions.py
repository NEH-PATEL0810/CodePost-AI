class AIServiceError(Exception):
    """Base AI exception."""
    pass


class AIRateLimitError(AIServiceError):
    """Rate limit exceeded."""
    pass


class AIUnavailableError(AIServiceError):
    """Temporary provider failure."""
    pass


class AIEmptyResponseError(AIServiceError):
    """AI returned an empty response."""
    pass


class AITimeoutError(AIServiceError):
    """AI request timed out."""
    pass
