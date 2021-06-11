import nitrotype
import json

from huey import crontab
from huey.contrib.djhuey import periodic_task, task


@periodic_task(crontab(minute='*/1'))
def every_five_mins():
    team = nitrotype.Team('PR2W')
    with open('random.txt', 'w') as text:
        text.write(json.dumps(team.data))
