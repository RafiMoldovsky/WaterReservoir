from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ReservoirSerializer
from .serializers import MetaDataSerializer
from .models import water_reservoir
from .models import meta_data
from django.http import HttpResponse
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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

def get_reservoirs_by_state(request, state):
    state=state.lower()
    with connection.cursor() as cursor:
        cursor.execute("SELECT DISTINCT site_id FROM daily_data WHERE state_code = %s ORDER BY site_id", [state])
        data = cursor.fetchall()
        print(data)
    return JsonResponse(data, safe=False)

def get_station_name(request, site_no):
    with connection.cursor() as cursor:
        cursor.execute("SELECT station_nm FROM meta_data WHERE site_no = %s;", [site_no])
        data = cursor.fetchall()
        print(data)
    return JsonResponse(data, safe=False)
def reservoirs_with_station_names(request, state):
    with connection.cursor() as cursor:
        cursor.execute("SELECT site_no, station_nm FROM meta_data WHERE state_code = %s;", [state])
        data = cursor.fetchall()
        print(data)
    return JsonResponse(data, safe=False)