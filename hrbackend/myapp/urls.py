
from django.urls import path
from .views import (
    UserListView,
    UserDetailView,
    EmployeeListCreateView,
    EmployeeDetailView,SupervisorEmployeeListView
)
from rest_framework.authtoken.views import obtain_auth_token

    # "token": "f3db6efef4d3fd7f66f7532ab10902a0171539b2"

urlpatterns = [
    # URLs para User
    path('users/', UserListView.as_view(), name='user-list-create'),  # Listar todos los usuarios y crear un nuevo usuario
    path('user/', UserDetailView.as_view(), name='user-detail'),  # Obtener, actualizar o eliminar un usuario específico
    path('supervisor/<int:supervisor_id>/employees/', SupervisorEmployeeListView.as_view(), name='supervisor-employee-list'),

    path('api/token/', obtain_auth_token, name='api_token_auth'),

    # URLs para Employee

    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),  # Listar todos los empleados y crear un nuevo empleado
    path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),  # Obtener, actualizar o eliminar un empleado específico
]