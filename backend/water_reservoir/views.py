from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReservoirSerializer
from .serializers import MetaDataSerializer
from .models import water_reservoir
from .models import meta_data
from django.http import HttpResponse
import subprocess

# Create your views here.

class ReservoirView(viewsets.ModelViewSet):
    serializer_class = ReservoirSerializer
    queryset = water_reservoir.objects.all()
class MetaDataView(viewsets.ModelViewSet):
    serializer_class = MetaDataSerializer
    queryset = meta_data.objects.all()

def upload_data(request):
    # Run the cron job using subprocess
    subprocess.call(["python", "water_reservoir/upload_script.py"])
    # Return a response to indicate that the update was successful
    return HttpResponse("Data upload complete")

def update_data(request):
    # Run the cron job using subprocess
    subprocess.call(["python", "water_reservoir/update_script.py"])
    # Return a response to indicate that the update was successful
    return HttpResponse("Data update complete")
def upload_meta_data(request):
    # Run the cron job using subprocess
    subprocess.call(["python", "water_reservoir/upload_meta_data_script.py"])
    # Return a response to indicate that the update was successful
    return HttpResponse("Meta data upload complete")

