# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-21 17:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0003_auto_20171120_1600'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agente',
            name='identificacion',
            field=models.CharField(max_length=100, unique=True, verbose_name='Identificacion'),
        ),
    ]