from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReservoirSerializer
from .models import water_reservoir
from django.http import HttpResponse
import subprocess

# Create your views here.

class ReservoirView(viewsets.ModelViewSet):
    serializer_class = ReservoirSerializer
    queryset = water_reservoir.objects.all()

def upload_data(request):
    # Run the cron job using subprocess
    subprocess.call(["python", "water_reservoir/upload_script.py"])
    # Return a response to indicate that the update was successful
    return HttpResponse("Data update complete")

def update_data(request):
    # Run the cron job using subprocess
    subprocess.call(["python", "water_reservoir/update_script.py"])
    # Return a response to indicate that the update was successful
    return HttpResponse("Data update complete")

