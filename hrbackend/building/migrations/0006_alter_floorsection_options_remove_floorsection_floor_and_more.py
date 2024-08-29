# Generated by Django 4.2.15 on 2024-08-29 18:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('building', '0005_floor_section_numbers'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='floorsection',
            options={'verbose_name': 'Floors section'},
        ),
        migrations.RemoveField(
            model_name='floorsection',
            name='floor',
        ),
        migrations.AddField(
            model_name='floorsection',
            name='building',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='building.building'),
        ),
    ]
