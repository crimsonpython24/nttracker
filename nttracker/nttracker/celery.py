import os

from celery import Celery
from celery.schedules import crontab

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nttracker.settings')

postgres_broker = 'sqla+postgresql://crimsonpython24:_16064Coding4Life@host/nttracker'
app = Celery('nttracker', broker='amqp://', backend='rpc://', include=['nttracker.tasks'])

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

# Optional configuration, see the application user guide.
app.conf.update(
    result_expires=3600,
)

app.conf.beat_schedule = {
    'add-every-10-seconds': {
        'task': 'nttracker.tasks.add',
        'schedule': 10.0,
        'args': (16, 16)
    },
}

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

if __name__ == '__main__':
    app.start()
