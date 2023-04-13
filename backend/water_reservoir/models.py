from django.db import models

# Create your models here.

class water_reservoir(models.Model):
    state_code = models.CharField(max_length=50)
    agency_cd = models.CharField(max_length=50,default='USGS')
    site_id = models.FloatField()
    date_time = models.DateTimeField()
    storage_volume = models.FloatField()
    value_estimated = models.CharField(max_length=50,default='A')
