from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import(
    GenerateRequestSerializer,
)

from .services.ai.service import GenerationService
from .services.ai.context import ProblemData

@api_view(["GET"])
def health(request):
    return Response({
        "status":"ok",
        "service":"CodePost AI Backend",
    })


@api_view(["POST"])
def generate(request):
    serializer = GenerateRequestSerializer(
        data=request.data
    )
    serializer.is_valid(
        raise_exception = True
    )

    problem = ProblemData(**serializer.validated_data)
    service = GenerationService()

    markdown = service.generate(problem)

    return Response({
        "success": True,
        "result": {
            "markdown": markdown
        },
    })
# Create your views here.
