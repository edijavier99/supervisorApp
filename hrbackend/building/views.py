# myapp/views.py
from rest_framework import generics
from .models import Building, Floor, FloorSection
from .serializers import BuildingSerializer, FloorSerializer, FloorSectionSerializer


# MISSING OF AUTH
class BuildingListCreateView(generics.ListCreateAPIView):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer

class BuildingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer

class FloorListCreateView(generics.ListCreateAPIView):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer

class FloorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer

class FloorSectionListCreateView(generics.ListCreateAPIView):
    queryset = FloorSection.objects.all()
    serializer_class = FloorSectionSerializer

class FloorSectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FloorSection.objects.all()
    serializer_class = FloorSectionSerializer
