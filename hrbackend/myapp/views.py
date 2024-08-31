from django.shortcuts import render,get_object_or_404
from rest_framework import generics
from .serializers import UserSerializer, EmployeeSerializer,EmployeeDetailSerializer,DropdownSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import User, Employee

# Create your views here.   
class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # Permite que cualquier persona cree un usuario
        if self.request.method == 'POST':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]

        return super().get_permissions()


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Retorna el usuario autenticado
        return self.request.user
    
    
class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
 

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class SupervisorEmployeeListView(generics.ListAPIView):
    serializer_class = EmployeeDetailSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        supervisor_id = self.kwargs['supervisor_id']
        supervisor = get_object_or_404(User, id=supervisor_id, is_supervisor=True)
        return Employee.objects.filter(supervisor=supervisor)
    

#THIS VIEW IS TO FETCH THE NAME AND SURNAME OF THE EMPLOYEES ON THE DROPDWON OF THE ADD SECTION FLOOR

class DropdownListView(generics.ListAPIView):
    serializer_class = DropdownSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        supervisor_id = self.kwargs['supervisor_id']
        supervisor = get_object_or_404(User, id=supervisor_id, is_supervisor=True)
        return User.objects.filter(id__in=Employee.objects.filter(supervisor=supervisor).values_list('user_id', flat=True))
