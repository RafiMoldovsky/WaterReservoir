"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from water_reservoir import views
from water_reservoir.views import update_data
from water_reservoir.views import upload_data
from water_reservoir.views import upload_meta_data
router = routers.DefaultRouter()
router.register(r'reservoir',views.ReservoirView, 'reservoir')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('update-data/', update_data, name='update_data'),
    path('upload-data/', upload_data, name='upload_data'),
    path('upload-meta-data/', upload_meta_data, name='upload_meta_data'),
    path('api/get-reservoirs-by-state/<str:state>/', views.get_reservoirs_by_state, name='get_reservoirs_by_state'),
    path('api/get-station-name/<int:site_no>/', views.get_station_name, name='get_station_name'),
    path('api/reservoirs-with-station-names/<str:state>/', views.reservoirs_with_station_names, name='reservoirs_with_station_names'),
    path('api/reservoirs-for-map/', views.get_reservoirs_for_map, name='get_reservoirs_for_map'),
    path('api/reservoirs-for-autocomplete/', views.get_reservoirs_for_autocomplete, name='get_reservoirs_for_autocomplete'),
    path('api/get_reservoir_daily_over_time/<str:site_id>/<str:start_date>/<str:end_date>/', views.get_reservoir_daily_over_time, name='get_reservoir_daily_over_time'),
    path('api/get_reservoir_monthly_over_time/<str:site_id>/', views.get_reservoir_monthly_over_time, name='get_reservoir_daily_over_time'),

]
