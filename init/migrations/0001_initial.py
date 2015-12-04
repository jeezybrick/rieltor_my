# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', serialize=False, auto_created=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('price', models.PositiveIntegerField()),
                ('street', models.CharField(max_length=100)),
                ('space', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
                ('currency', models.CharField(max_length=20)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
