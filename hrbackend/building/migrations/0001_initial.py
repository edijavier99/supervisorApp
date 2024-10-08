# Generated by Django 4.2.15 on 2024-08-16 12:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Building',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('building_hours', models.IntegerField()),
                ('address', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Floor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('floor_number', models.PositiveIntegerField(unique=True)),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='floors', to='building.building')),
            ],
            options={
                'ordering': ['floor_number'],
            },
        ),
        migrations.CreateModel(
            name='FloorSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_hours', models.FloatField()),
                ('section_color', models.CharField(max_length=50)),
                ('floor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='building.floor')),
            ],
            options={
                'verbose_name': 'Floor section',
            },
        ),
    ]
