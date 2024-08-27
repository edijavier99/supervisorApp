from django.contrib import admin
from .models import Delivery, Product, ProductCategory
# Register your models here.
admin.site.register(Delivery)
admin.site.register(Product)
admin.site.register(ProductCategory)