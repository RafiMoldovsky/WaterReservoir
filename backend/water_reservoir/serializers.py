from rest_framework import serializers
from .models import water_reservoir
from .models import meta_data

class ReservoirSerializer(serializers.ModelSerializer):
    class Meta:
        model = water_reservoir
        fields = ('state_code', 'agency_cd', 'site_id', 'date_time','storage_volume','value_estimated')
        db_table = 'daily_data'
class MetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = meta_data
        fields = ('state_code', 'agency_cd', 'site_no', 'station_nm', 'site_tp_cd', 'dec_lat_va', 'dec_long_va', 'coord_acy_cd', 'dec_coord_datum_cd', 'alt_va', 'alt_acy_va', 'alt_datum_cd', 'huc_cd')
        db_table = 'meta_data'   