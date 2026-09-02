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
    authors = models.ManyToManyField(Author)
    work_id = models.CharField(max_length=50, unique=True)

class Edition(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True)
    publish_date = models.DateField(null=True, blank=True)
    language = models.CharField(max_length=50)
    isbn = models.CharField(max_length=17, unique=True)
