from django.contrib import admin
from .models import Building, Floor, FloorSection
# Register your models here.
admin.site.register(Building)
admin.site.register(Floor)
admin.site.register(FloorSection)