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
]
