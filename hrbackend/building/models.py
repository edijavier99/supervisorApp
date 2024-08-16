from django.db import models
from myapp.models import TimeStampedModel
from django.core.exceptions import ValidationError

# Create your models here.

class Building(models.Model):
    name = models.CharField(max_length=100)
    building_hours = models.IntegerField()  # Operating hours
    address = models.CharField(max_length=150)

    def __str__(self):
        return self.name
    
class Floor(TimeStampedModel):
    floor_number = models.PositiveIntegerField(unique=True)
    building = models.ForeignKey( Building, on_delete= models.CASCADE, related_name= 'floors')

    class Meta():
        ordering = ["floor_number"]

    def __str__(self):
        return f"Floor {self.floor_number}"
    
class FloorSection(models.Model):
    section_hours = models.FloatField()
    section_color = models.CharField(max_length=50)
    #RELATION WITH THE FLOOR
    floor = models.ForeignKey(Floor, on_delete= models.CASCADE, related_name= 'sections')

    class Meta():
        verbose_name = 'Floor section'
        indexes = [
            models.Index(fields=['section_color']),
        ]
        
    def __str__(self):
        return f"Section {self.pk} on Floor {self.floor.floor_number} with color {self.section_color}"

