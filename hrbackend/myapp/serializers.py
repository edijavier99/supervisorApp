from rest_framework import serializers
from .models import User, Employee

class UserSerializer(serializers.ModelSerializer):
    user_password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_manager', 'is_supervisor', 'is_superuser', 'company_number', 'phone_number', 'is_employee', 'user_password')

    def validate(self, data):
        # Valida si el usuario es un empleado y no tiene contraseña
        if data.get('is_employee') and data.get('user_password'):
            raise serializers.ValidationError({"user_password": "Employees should not have a password."})
        return data

    def create(self, validated_data):
        password = validated_data.pop('user_password', None)
        user = super().create(validated_data)
        if not user.is_employee and password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user
        
    def update(self, instance, validated_data):
        password = validated_data.pop('user_password', None)
        instance = super().update(instance, validated_data)
        if password and not instance.is_employee:
            instance.set_password(password)
        instance.save()
        return instance

class EmployeeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(is_manager=False))

    class Meta:
        model = Employee
        fields = ('id', 'user', 'position', 'building', "supervisor")

    def create(self, validated_data):
        user = validated_data.pop('user')
        employee = Employee.objects.create(user=user, **validated_data)
        return employee

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        if user_data:
            user = instance.user
            user = User.objects.get(pk=user_data)
            instance.user = user
            instance.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number')  # Ajusta según sea necesario


class DropdownSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name')

class EmployeeDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer()
    # Si necesitas incluir detalles del building y/o supervisor, añade sus serializadores aquí.
    # Ejemplo:
    # building = BuildingSerializer()
    # supervisor = UserDetailSerializer()

    class Meta:
        model = Employee
        fields = ('id', 'user')  # Ajusta según sea necesario