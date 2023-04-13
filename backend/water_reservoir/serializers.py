from rest_framework import serializers
from .models import water_reservoir

class ReservoirSerializer(serializers.ModelSerializer):
    class Meta:
        model = water_reservoir
        fields = ('state_code', 'agency_cd', 'site_id', 'date_time','storage_volume','value_estimated')
        db_table = 'water_reservoir'