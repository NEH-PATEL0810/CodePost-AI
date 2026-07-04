from django.urls import path

from .views import(
    generate,health,
)

urlpatterns = [
    path(
        "health/",
        health
    ),
    path(
        "generate/",
        generate,
    ),
]