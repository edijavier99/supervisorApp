# Generated by Django 4.2.15 on 2024-08-28 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('building', '0004_alter_building_managers_alter_building_supervisor'),
    ]

    operations = [
        migrations.AddField(
            model_name='floor',
            name='section_numbers',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
