# Generated by Django 5.1.1 on 2024-09-11 12:38

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_type', models.CharField(max_length=50)),
                ('first_name', models.CharField(max_length=50)),
                ('lastName', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=50)),
                ('hashed_password', models.CharField(max_length=50)),
                ('registrationDate', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'db_table': 'users',
            },
        ),
    ]