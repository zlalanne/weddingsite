from django.db import models

class Guest(models.Model):
    name = models.CharField(max_length=200)
    adults = models.IntegerField()
    children = models.IntegerField()
    attending = models.BooleanField()
    song = models.CharField(max_length=200)