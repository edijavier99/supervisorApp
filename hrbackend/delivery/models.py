from django.db import models
from myapp.models import TimeStampedModel
from django.core.exceptions import ValidationError

#DELIVERY MODELS HERE
#RELATIONS : ONE DELIVERY MANY PRODUCTS --- ONE PRODUCTS BELONGS TO MANY DELIVERIES
#ONE PRODUCTS BELONGS JUST TO A PRODUCT CATEGORY BUT A CATEGORY HAS MANY PRODUCTS

class Delivery(TimeStampedModel):
    products = models.ManyToManyField('Product', related_name='deliveries', blank=False)

    def __str__(self):
        return f"New delivery created on the {self.created_at}"
    
    def clean(self):
        super().clean()
        if not self.products.exists():
            raise ValidationError("At least one product must be added to a delivery")
        
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class ProductCategory(models.Model):
    name = models.CharField(max_length= 70 , unique = True)

    def __str__(self):
        return self.name

    class Meta():
        verbose_name = "Product Category"
        verbose_name_plural = "Products Categories"
        orderig = ["name"]


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
