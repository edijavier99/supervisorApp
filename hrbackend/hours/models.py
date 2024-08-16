from django.db import models
from myapp.models import TimeStampedModel
from building.models import FloorSection
from myapp.models import User
from django.db.models import Sum
from django.core.exceptions import ValidationError

def validate_user_role(user):
    """
    Verifica si el usuario es un empleado o supervisor.
    Lanza una excepción si el usuario es un manager o superuser.
    """
    if user.is_manager or user.is_superuser:
        raise ValidationError("Only employees and supervisors can have work hours records.")

class WorkHours(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2)  # Horas trabajadas en el día

    def clean(self):
        validate_user_role(self.user)  # Usa la función de validación

    def save(self, *args, **kwargs):
        self.clean()  # Llama a clean para validaciones personalizadas
        super().save(*args, **kwargs)  # Llama al método save() de la superclase

    def __str__(self):
        return f"{self.user} - {self.date} - {self.hours_worked} hours"

    class Meta:
        ordering = ['date']
        unique_together = ('user', 'date')  # Evita registros duplicados por día

class ExtraHours(TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    reason = models.TextField()
    floor_section = models.ForeignKey(FloorSection, on_delete=models.CASCADE, related_name='extra_hours')

    def clean(self):
        validate_user_role(self.user)  # Usa la función de validación

    def save(self, *args, **kwargs):
        self.clean()  # Llama a clean para validaciones personalizadas
        super().save(*args, **kwargs)  # Llama al método save() de la superclase

    def __str__(self):
        return f"Extra Hours on Section {self.floor_section.pk} - Reason: {self.reason}"

# Modelo para reportes diarios agregados
class WorkHoursReport(TimeStampedModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    report_date = models.DateField()
    total_hours = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def update_total_hours(self):
        # Calcula las horas trabajadas totales para el usuario hasta la fecha del reporte
        total_hours = WorkHours.objects.filter(user=self.user, date__lte=self.report_date).aggregate(total=Sum('hours_worked'))['total']
        self.total_hours = total_hours if total_hours is not None else 0.0
        self.save()

    def __str__(self):
        return f"Report for {self.user} on {self.report_date} - Total Hours: {self.total_hours}"

    class Meta:
        unique_together = ('user', 'report_date')  # Asegura que solo haya un reporte por usuario por fecha
        ordering = ['report_date']

# Función para generar reportes detallados de horas trabajadas por usuario
def generate_employee_report(user, end_date):
    """
    Genera un reporte detallado de las horas trabajadas por un usuario hasta una fecha específica.
    """
    if user.is_manager or user.is_superuser:
        raise PermissionError("Managers and superusers cannot have work hours records.")
    
    work_hours = WorkHours.objects.filter(user=user, date__lte=end_date).order_by('date')
    report_lines = []

    for wh in work_hours:
        report_lines.append(f"{wh.date}: {wh.hours_worked} hours")

    return "\n".join(report_lines)
