from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import(
    GenerateRequestSerializer,
)

from .services.generation_service import GenerationService
from .services.ai.context import ProblemData
from .services.ai.exceptions import AIServiceError

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
                "success": True,
                "result": {
                    "markdown": markdown,
                    "metadata": {
                        "provider": "groq",
                        "version": "1.0"
                    }
                }
            }
        )
    except AIServiceError as e:
        return Response(
            {
                "success": False,
                "message": str(e),
            },
            status=503,
        )
    except (RuntimeError, ValueError) as e:
        return Response(
            {
                "success": False,
                "message": str(e),
            },
            status=400,
        )
    except Exception as e:
        return Response(
            {
                "success": False,
                "message": str(e),
            },
            status=500,
        )
# Create your views here.
