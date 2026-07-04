from rest_framework import serializers

class GenerateRequestSerializer(serializers.Serializer):
    title = serializers.CharField()
    difficulty = serializers.CharField()
    description=serializers.CharField()
    examples= serializers.ListField(
        child = serializers.CharField()
    )
    constraints = serializers.ListField(
        child = serializers.CharField(),
        required=False,
    )
    language=serializers.CharField()
    code = serializers.CharField()
    url = serializers.URLField()


class GenerateResponseSerializer(serializers.Serializer):
    markdown = serializers.CharField()