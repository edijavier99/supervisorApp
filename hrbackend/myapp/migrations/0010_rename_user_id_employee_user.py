# Generated by Django 4.2.15 on 2024-08-23 19:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0009_rename_user_employee_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='employee',
            old_name='user_id',
            new_name='user',
        ),
    ]
