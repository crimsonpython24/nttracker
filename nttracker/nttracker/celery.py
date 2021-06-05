from __future__ import absolute_import
import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nttracker.settings')

postgres_broker = 'sqla+postgresql://crimsonpython24:_16064Coding4Life@host/nttracker'

app = Celery('nttracker', broker='amqp://', backend='rpc://', include=['nttracker.tasks'])
app.autodiscover_tasks()

app.conf.update(
    timezone = "Asia/Taipei",
    result_backend = 'django-db',
    broker_url = 'redis://127.0.0.1:6379',
    cache_backend = 'default',

    beat_schedule = {
        'add-every-10-seconds': {
            'task': 'nttracker.tasks.add',
            'schedule': 10.0,
            'args': (16, 16)
        },
    }
)

if __name__ == '__main__':
    app.start()
