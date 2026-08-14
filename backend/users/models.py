# backend/users/models.py
from django.db import models


class User(models.Model):
    email: models.EmailField()
    username: models.CharField(max_length=15)
    password: models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
