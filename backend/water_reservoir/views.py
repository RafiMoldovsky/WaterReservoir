from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReservoirSerializer
from .models import water_reservoir

# Create your views here.

class ReservoirView(viewsets.ModelViewSet):
    serializer_class = ReservoirSerializer
    queryset = water_reservoir.objects.all()
