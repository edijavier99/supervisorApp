from django.db import models
from django.core.exceptions import ValidationError

# One building is related with an user , if manager, one to many and if supervisor one to one relation

class Building(models.Model):
    name = models.CharField(max_length=100)
    building_hours = models.IntegerField()  # Operating hours
    address = models.CharField(max_length=150)
    supervisor = models.OneToOneField('myapp.Employee', on_delete=models.CASCADE, related_name='supervised_building')
    managers = models.ManyToManyField('myapp.Employee', related_name='managed_buildings')

    def __str__(self):
        return self.name
    def clean(self):
        # Llama a clean() de la superclase para realizar validaciones básicas
        super().clean()

        # Validación para el supervisor
        if not self.supervisor:
            raise ValidationError("Cada edificio debe tener un supervisor.")

        # Validación para los gerentes
        # Usar una condición simple para la relación muchos a muchos
        if self.managers.count() == 0:
            raise ValidationError("Cada edificio debe tener al menos un gerente.")
    
class Floor(models.Model):
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

