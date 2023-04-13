from django.db import models

# Create your models here.

class water_reservoir(models.Model):
    state_code = models.CharField(max_length=50)
    agency_cd = models.CharField(max_length=50,default='USGS')
    site_id = models.FloatField()
    date_time = models.DateTimeField()
    storage_volume = models.FloatField()
    value_estimated = models.CharField(max_length=50,default='A')
class meta_data(models.Model):
    state_code = models.CharField(max_length=50, default='az')
    agency_cd = models.CharField(max_length=50)
    site_no = models.FloatField()
    station_nm = models.CharField(max_length=100)
    site_tp_cd = models.CharField(max_length=50)
    dec_lat_va = models.FloatField()
    dec_long_va = models.FloatField()
    coord_acy_cd = models.CharField(max_length=10)
    dec_coord_datum_cd = models.CharField(max_length=10)
    alt_va = models.FloatField()
    alt_acy_va = models.FloatField()
    alt_datum_cd = models.CharField(max_length=10)
    huc_cd = models.FloatField()