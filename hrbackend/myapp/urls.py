
from django.urls import path
from .views import (
    UserListView,
    UserDetailView,
    EmployeeListCreateView,
    EmployeeDetailView
)

urlpatterns = [
    # URLs para User
    path('users/', UserListView.as_view(), name='user-list-create'),  # Listar todos los usuarios y crear un nuevo usuario
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # Obtener, actualizar o eliminar un usuario específico
    
    # URLs para Employee
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),  # Listar todos los empleados y crear un nuevo empleado
    path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),  # Obtener, actualizar o eliminar un empleado específico
]