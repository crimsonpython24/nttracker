import nitrotype   # clone adl212's repo lmao
import json
from datetime import datetime

from huey import crontab
from huey.contrib.djhuey import periodic_task, task

from .models import RaceData, RacerLog, RacerData, TeamData


# @periodic_task(crontab(minute='*/1'))
# def record_racedata(teamname):
#     team = nitrotype.Team(teamname)
#     team_id = team.data["info"]["teamID"]
#     timestamp = datetime.now().timestamp()
    
#     for members in team.data["members"]:
#         racer_id = members["userID"]
#         races = members["played"]
#         time = members["secs"]
#         typed = members["typed"]
#         errs = members["errs"]

#         rcd = RaceData(
#             racer_id=racer_id,
#             team_id=team_id,
#             timestamp=timestamp,
#             races=races,
#             time=time,
#             typed=typed,
#             errs=errs
#         )
#         rcd.save()


# @periodic_task(crontab(day_of_week='1'))
# def record_racerlog(teamname):
#     team = nitrotype.Team(teamname)
#     team_id = team.data["info"]["teamID"]
#     timestamp = datetime.now().timestamp()
    
#     for members in team.data["members"]:
#         racer_id = members["userID"]
#         races = members["played"]
#         role = members["role"]
#         username = members["username"]
#         display_name = members["displayName"]
#         total_races = members["racesPlayed"]
#         speed = members["avgSpeed"]

#         rcrl = RacerLog(
#             racer_id=racer_id,
#             team_id=team_id,
#             timestamp=timestamp,
#             role=timestamp,
#             username=username,
#             display_name=display_name,
#             total_races=total_races,
#             speed=speed
#         )
#         rcrl.save()


# @periodic_task(crontab(minute='*/1'))
# def record_racerdata(teamname):
#     team = nitrotype.Team(teamname)
#     team_id = team.data["info"]["teamID"]
#     timestamp = datetime.now().timestamp()
    
#     for members in team.data["members"]:
#         racer_id = members["userID"]
#         join_stamp = members["joinStamp"]
#         last_activity = members["lastActivity"]
#         last_login = members["lastLogin"]

#         rcrd = RacerData(
#             racer_id=racer_id,
#             team_id=team_id,
#             timestamp=timestamp,
#             join_stamp=join_stamp,
#             last_activity=last_activity,
#             last_login=last_login,
#         )
#         rcrd.save()


# @periodic_task(crontab(day_of_week='1'))
# def record_teamdata(teamname):
#     team = nitrotype.Team(teamname)
#     team_id = team.data["info"]["teamID"]
#     timestamp = datetime.now().timestamp()
#     tag = team.data["info"]["tag"]
#     tag_color = team.data["tagColor"]
#     name = team.data["info"]["name"]

#     td = TeamData(
#         team_id=team_id,
#         timestamp=timestamp,
#         tag=tag,
#         tag_color=tag_color,
#         name=name,
#     )
#     td.save()


@periodic_task(crontab(minute='*/1'))
def record_racedata():
    team = nitrotype.Team('PR2W')
    team_id = team.data["info"]["teamID"]
    timestamp = datetime.now().timestamp()
    
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


@periodic_task(crontab(day_of_week='1'))
def record_racerlog():
    team = nitrotype.Team('PR2W')
    team_id = team.data["info"]["teamID"]
    timestamp = datetime.now().timestamp()
    
    for members in team.data["members"]:
        racer_id = members["userID"]
        races = members["played"]
        username = members["username"]
        display_name = members["displayName"]
        total_races = members["racesPlayed"]
        speed = members["avgSpeed"]

        rcrl = RacerLog(
            racer_id=racer_id,
            team_id=team_id,
            timestamp=timestamp,
            username=username,
            display_name=display_name,
            total_races=total_races,
            speed=speed
        )
        rcrl.save()


@periodic_task(crontab(minute='*/1'))
def record_racerdata():
    team = nitrotype.Team('PR2W')
    team_id = team.data["info"]["teamID"]
    timestamp = datetime.now().timestamp()
    
    for members in team.data["members"]:
        racer_id = members["userID"]
        role = members["role"]
        join_stamp = members["joinStamp"]
        last_activity = members["lastActivity"]
        last_login = members["lastLogin"]

        rcrd = RacerData(
            racer_id=racer_id,
            team_id=team_id,
            timestamp=timestamp,
            role=role,
            join_stamp=join_stamp,
            last_activity=last_activity,
            last_login=last_login,
        )
        rcrd.save()


@periodic_task(crontab(day_of_week='1'))
def record_teamdata():
    team = nitrotype.Team('PR2W')
    team_id = team.data["info"]["teamID"]
    timestamp = datetime.now().timestamp()
    tag = team.data["info"]["tag"]
    tag_color = team.data["info"]["tagColor"]
    name = team.data["info"]["name"]

    td = TeamData(
        team_id=team_id,
        timestamp=timestamp,
        tag=tag,
        tag_color=tag_color,
        name=name,
    )
    td.save()
