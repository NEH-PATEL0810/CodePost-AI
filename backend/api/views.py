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

    try:
        service = GenerationService()

        markdown = service.generate(
            serializer.validated_data
        )

        return Response(
            {
                "result": {
                    "markdown": markdown
                }
            }
        )
    except Exception as e:
        return Response(
            {
                "error": str(e)
            },
            status=500,
        )
# Create your views here.
