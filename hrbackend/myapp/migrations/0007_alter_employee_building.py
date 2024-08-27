# Generated by Django 4.2.15 on 2024-08-23 18:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('building', '0002_initial'),
        ('myapp', '0006_alter_employee_building'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='building',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='building.building'),
        ),
    ]
