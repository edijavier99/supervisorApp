# myapp/serializers.py
from rest_framework import serializers
from .models import Building, Floor, FloorSection
from myapp.models import Employee,User

class FloorSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloorSection
        fields = ('id','section_name','section_hours', 'section_color', 'building')

class FloorSerializer(serializers.ModelSerializer):
    sections = FloorSectionSerializer(many=True, read_only=True)  # Nested serializer

    class Meta:
        model = Floor
        fields = ('id', 'floor_number', 'building', 'sections', 'section_numbers')

class BuildingSerializer(serializers.ModelSerializer):
    supervisor = serializers.PrimaryKeyRelatedField(
        queryset=Employee.objects.all(),
        required=False,
        allow_null=True
    )
    managers = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(is_manager=True),
        many=True
    )
    floors = FloorSerializer(many=True, read_only=True)
    sections = FloorSectionSerializer(many=True)

    class Meta:
        model = Building
        fields = ('id', 'name', 'building_hours', 'address', 'supervisor', 'managers', 'floors', 'sections')

    def create(self, validated_data):
        # Primero, crea el edificio
        building = super().create(validated_data)
        
        # Asocia los gerentes después de que el edificio haya sido guardado
        managers_data = self.context['request'].data.get('managers', [])
        building.managers.set(managers_data)

        # Manejo de pisos anidados si es necesario
        floors_data = self.context['request'].data.get('floors', [])
        for floor_data in floors_data:
            floor_data['building'] = building
            Floor.objects.create(**floor_data)

        # Manejo de secciones anidadas si es necesario
        sections_data = self.context['request'].data.get('sections', [])
        for section_data in sections_data:
            section_data['building'] = building
            FloorSection.objects.create(**section_data)

        return building

    def update(self, instance, validated_data):
        # Actualiza el edificio
        instance = super().update(instance, validated_data)
        
        # Actualiza la relación muchos a muchos de gerentes
        managers_data = self.context['request'].data.get('managers', [])
        instance.managers.set(managers_data)

        # Actualiza los objetos Floor existentes
        floors_data = self.context['request'].data.get('floors', [])
        existing_floors = {floor.id: floor for floor in instance.floors.all()}
        for floor_data in floors_data:
            floor_id = floor_data.get('id')
            if floor_id:
                # Actualiza piso existente
                floor = existing_floors.get(floor_id)
                if floor:
                    for attr, value in floor_data.items():
                        setattr(floor, attr, value)
                    floor.save()
                    existing_floors.pop(floor_id)
            else:
                # Crea un nuevo piso
                floor_data['building'] = instance
                Floor.objects.create(**floor_data)

        # Elimina los pisos que no están incluidos en la actualización
        for floor in existing_floors.values():
            floor.delete()

        # Actualiza las secciones existentes
        sections_data = self.context['request'].data.get('sections', [])
        existing_sections = {section.id: section for section in instance.sections.all()}
        for section_data in sections_data:
            section_id = section_data.get('id')
            if section_id:
                # Actualiza sección existente
                section = existing_sections.get(section_id)
                if section:
                    for attr, value in section_data.items():
                        setattr(section, attr, value)
                    section.save()
                    existing_sections.pop(section_id)
            else:
                # Crea una nueva sección
                section_data['building'] = instance
                FloorSection.objects.create(**section_data)

        # Elimina las secciones que no están incluidas en la actualización
        for section in existing_sections.values():
            section.delete()

        return instance
