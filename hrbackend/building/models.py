from django.db import models
from django.core.exceptions import ValidationError

class Building(models.Model):
    name = models.CharField(max_length=100)
    building_hours = models.IntegerField()  # Operating hours
    address = models.CharField(max_length=150)
    
    # Permitir que el campo supervisor sea opcional
    supervisor = models.OneToOneField(
        'myapp.Employee',
        on_delete=models.CASCADE,
        related_name='supervised_building',
        null=True,
        blank=True,
        limit_choices_to={'user__is_supervisor': True}  # Filtrar solo los empleados que son supervisores
    )
    
    managers = models.ManyToManyField(
        'myapp.User',
        related_name='managed_buildings',
        limit_choices_to={'is_manager': True}  # Filtrar solo usuarios que son managers
    )

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()

        # Validación para los gerentes: Asegurarse de que al menos un gerente esté asignado
        if self.managers.count() == 0:
            raise ValidationError("Cada edificio debe tener al menos un gerente.")
        
class Floor(models.Model):
    floor_number = models.PositiveIntegerField(unique=True)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='floors')
    # section_number 
    

    class Meta:
        ordering = ["floor_number"]

    def __str__(self):
        return f"Floor {self.floor_number}"
    
class FloorSection(models.Model):
    section_hours = models.FloatField()
    section_color = models.CharField(max_length=50)
    floor = models.ForeignKey(Floor, on_delete=models.CASCADE, related_name='sections')

    class Meta:
        verbose_name = 'Floor section'
        indexes = [
            models.Index(fields=['section_color']),
        ]
        
    def __str__(self):
        return f"Section {self.pk} on Floor {self.floor.floor_number} with color {self.section_color}"
