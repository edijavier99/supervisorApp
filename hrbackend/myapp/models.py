from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from building.models import Building
from django.core.exceptions import ValidationError

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El campo de correo electrónico debe ser proporcionado')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        
        # Solo establece la contraseña si el usuario no es un empleado
        if not extra_fields.get('is_employee') and password:
            user.set_password(password)
        else:
            user.set_unusable_password()  # Marca la contraseña como no usable para empleados
        
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['company_number']

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=40)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_supervisor = models.BooleanField(default=False)
    is_employee = models.BooleanField(default=False)  # Indica si el usuario es un empleado
    company_number = models.PositiveIntegerField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)  # Usar CharField para números de teléfono

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def clean(self):
        super().clean()
        if self.is_manager and self.is_superuser:
            raise ValidationError('A user cannot be both a manager and supervisor')


# MODEL FOR THE EMPLOYEE
class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')  # Corrected here
    position = models.CharField(max_length=100, blank=True, null=True)
    building = models.ForeignKey(Building, on_delete=models.CASCADE, related_name='employees', null=True)
    
    # Campo para almacenar el supervisor
    supervisor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='supervised_employees')

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'
