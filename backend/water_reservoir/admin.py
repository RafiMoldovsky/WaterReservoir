from django.contrib import admin
from .models import water_reservoir

class water_reservoirAdmin(admin.ModelAdmin):
    list_display = ('name', 'data', 'level', 'volume')

# Register your models here.

admin.site.register(water_reservoir, water_reservoirAdmin)