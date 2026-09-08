from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_library(request):
    return Response({
        "message": f"Welcome, {request.user.username}",
        "user": {
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
        },
    })