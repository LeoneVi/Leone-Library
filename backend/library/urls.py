from django.urls import path

from . import views

app_name = "library"

urlpatterns = [
    path("my-library/", views.my_library, name="my-library"),
]