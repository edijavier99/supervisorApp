from django.db import models
from myapp.models import TimeStampedModel
from django.core.exceptions import ValidationError
from myapp.models import User
from building.models import Building

#DELIVERY MODELS HERE
#RELATIONS : ONE DELIVERY MANY PRODUCTS --- ONE PRODUCTS BELONGS TO MANY DELIVERIES
#ONE PRODUCTS BELONGS JUST TO A PRODUCT CATEGORY BUT A CATEGORY HAS MANY PRODUCTS
#ONE DELIVERY MUST BE ATTACH TO A SUPERVISOR

class Delivery(TimeStampedModel):
    products = models.ManyToManyField('Product', related_name='deliveries', blank=False)
    supervisor = models.ForeignKey(User, on_delete= models.CASCADE , related_name = "deliveries")

    def __str__(self):
        return f"New delivery created on the {self.created_at}"
    
    def clean(self):
        # Avoid unnecessary queries by only checking if there are products
        if self.pk is None:  # If the instance is not yet saved
            if not self.products.exists():
                raise ValidationError("At least one product must be added to a delivery")

    def save(self, *args, **kwargs):
        if self.pk is None:  # Only validate if the instance is new
            self.full_clean()  # Ensure all validations are run
        super().save(*args, **kwargs)  # Save the object to the database


class BuildingStock(models.Model):
    building = models.OneToOneField(Building, on_delete=models.CASCADE, related_name="stock")

    def __str__(self):
        return f"This is the stock of the building {self.building.name}"
    
    class Meta():
        verbose_name = 'Building Stock'
        verbose_name_plural = 'Building Stocks'


class ProductCategory(models.Model):
    name = models.CharField(max_length= 70 , unique = True)
    building_stocks = models.ManyToManyField(BuildingStock, related_name='product_categories')

    def __str__(self):
        return self.name

    class Meta():
        verbose_name = "Product Category"
        verbose_name_plural = "Products Categories"
        ordering = ["name"]


class Product(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()  # Use PositiveIntegerField for quantities
    #RELATION ONE TO MANY WITH PRODUCTS CATEGORY -- FOREING KEY
    product_category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return self.name
    
    class Meta():
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ["name"]
        unique_together = ('name', 'product_category') 
