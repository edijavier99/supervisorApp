from .models import User,Employee
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    user_password = serializers.CharField(write_only=True, required=True)
    
    class Meta():
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_manager', 'is_superuser', 'company_number', 'password')

        def create(self, validated_data):
            password = validated_data.pop('user_password')
            user = super().create(validated_data)
            user.set_password(password)
            user.save()
            return user
        
        def update(self, instance, validated_data):
            password = validated_data.pop('password')
            user = super().update(instance,validated_data)
            if password:
                user.set_password(password)
                user.save()
            return user
        
class EmployeeSerializer():

    class Meta():
        model = Employee
        fields = ('id', 'user', 'position', 'building')
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        employee = Employee.objects.create(user=user, **validated_data)
        return employee
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user = instance.user
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
