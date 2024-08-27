# myapp/urls.py
from django.urls import path
from .views import (
    BuildingListCreateView, BuildingDetailView,
    FloorListCreateView, FloorDetailView,
    FloorSectionListCreateView, FloorSectionDetailView
)

urlpatterns = [
    # Building URLs
    path('buildings/', BuildingListCreateView.as_view(), name='building-list-create'),
    path('buildings/<int:pk>/', BuildingDetailView.as_view(), name='building-detail'),
    
    # Floor URLs
    path('floors/', FloorListCreateView.as_view(), name='floor-list-create'),
    path('floors/<int:pk>/', FloorDetailView.as_view(), name='floor-detail'),
    
    # FloorSection URLs
    path('floor-sections/', FloorSectionListCreateView.as_view(), name='floor-section-list-create'),
    path('floor-sections/<int:pk>/', FloorSectionDetailView.as_view(), name='floor-section-detail'),
]
