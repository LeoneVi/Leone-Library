# backend/library/models.py

from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth = models.DateField()
    death = models.DateField(null=True, blank=True)  # Living authors have death set to null


class Publisher(models.Model):
    name = models.CharField(max_length=100, unique=True)


class Book(models.Model):
    title = models.CharField(max_length=200)
    language = models.CharField(max_length=50)

    authors = models.ManyToManyField(Author)
    publisher = models.ManyToManyField(Publisher)
    publish_date = models.DateField()

    isbn = models.CharField(max_length=13, unique=True)
    work_id = models.CharField(max_length=50, unique=True)
