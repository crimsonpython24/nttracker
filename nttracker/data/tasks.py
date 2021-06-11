import nitrotype   # clone adl212's repo lmao
import json
import datetime

from huey import crontab
from huey.contrib.djhuey import periodic_task, task

from .models import RaceData, RacerLog, RacerData, TeamData


@periodic_task(crontab(minute='*/1'))
def every_five_mins():
    team = nitrotype.Team('PR2W')

    team_id = team.data["info"]["teamID"]
    timestamp = datetime.datetime.now()
    
    for members in team.data["members"]:
        racer_id = members["userID"]
        races = members["played"]
        time = members["secs"]
        typed = members["typed"]
        errs = members["errs"]

        rcd = RaceData(
            racer_id=racer_id,
            team_id=team_id,
            timestamp=timestamp,
            races=races,
            time=time,
            typed=typed,
            errs=errs
        )
        rcd.save()
