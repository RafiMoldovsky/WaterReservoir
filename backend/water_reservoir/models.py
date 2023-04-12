from django.db import models

# Create your models here.

class ReservoirData(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField()
    level = models.FloatField()
    volume = models.FloatField()
