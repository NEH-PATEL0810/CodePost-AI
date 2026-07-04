from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import(
    GenerateRequestSerializer,
)

from .services import(
    DocumentationGenerator,
)

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

    result = DocumentationGenerator().generate(
        serializer.validated_data
    )

    return Response({
        "success": True,
        "result": result,
    })
# Create your views here.
