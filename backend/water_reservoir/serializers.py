from rest_framework import serializers
from .models import water_reservoir

class ReservoirSerializer(serializers.ModelSerializer):
    class Meta:
        model = water_reservoir
        fields = ('name', 'date', 'level', 'volume')
