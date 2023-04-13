from django.contrib import admin
from .models import water_reservoir
from .models import meta_data

class water_reservoirAdmin(admin.ModelAdmin):
    list_display = ('state_code', 'agency_cd', 'site_id', 'date_time', 'storage_volume', 'value_estimated')
class meta_dataAdmin(admin.ModelAdmin):
    list_display = ('state_code', 'agency_cd', 'site_no', 'station_nm', 'site_tp_cd', 'dec_lat_va', 'dec_long_va', 'coord_acy_cd', 'dec_coord_datum_cd', 'alt_va', 'alt_acy_va', 'alt_datum_cd', 'huc_cd')
# Register your models here.

admin.site.register(water_reservoir, water_reservoirAdmin)
admin.site.register(meta_data, meta_dataAdmin)