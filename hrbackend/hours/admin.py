from django.contrib import admin
from .models import ExtraHours,WorkHours,WorkHoursReport

# Register your models here.
admin.site.register(ExtraHours)
admin.site.register(WorkHours)
admin.site.register(WorkHoursReport)