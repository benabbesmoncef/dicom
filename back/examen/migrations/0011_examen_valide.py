# Generated by Django 3.0.7 on 2020-07-09 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examen', '0010_auto_20200708_2305'),
    ]

    operations = [
        migrations.AddField(
            model_name='examen',
            name='valide',
            field=models.BooleanField(default=False),
        ),
    ]
