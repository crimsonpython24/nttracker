from __future__ import absolute_import

import django
django.setup()

from celery import Celery
from celery.schedules import crontab

app = Celery()


@app.task
def add(x, y):
    z = x + y
    print(z)
