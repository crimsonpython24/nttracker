import nitrotype   # clone adl212's repo lmao
import json
import time
from datetime import datetime

from huey import crontab
from huey.contrib.djhuey import periodic_task, task

from .models import RaceData, RacerLog, RacerData, TeamData


def get_racedata(teamname, cron_min):
    team = nitrotype.Team(teamname)
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


@task()
def record_racedata(teamname, cron_min):
    def wrapper():
        get_racedata(teamname, cron_min)

    schedule = crontab(minute=cron_min)
    task_name = 'record_racedata_%s_%s' % (int(time.time()), teamname)
    periodic_task(schedule, name=task_name)(wrapper)

record_racedata('PR2W', '*/1')
record_racedata('SNAAKE', '*/1')


def get_racerlog(teamname, cron_min):
    team = nitrotype.Team(teamname)
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


@task()
def record_racerlog(teamname, cron_day):
    def wrapper():
        get_racerlog(teamname, cron_day)

    schedule = crontab(day_of_week=cron_day)
    task_name = 'record_racerlog_%s_%s' % (int(time.time()), teamname)
    periodic_task(schedule, name=task_name)(wrapper)

record_racerlog('PR2W', '1')
record_racerlog('SNAAKE', '1')


def get_racerdata(teamname, cron_min):
    team = nitrotype.Team(teamname)
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


@task()
def record_racerdata(teamname, cron_min):
    def wrapper():
        get_racerdata(teamname, cron_min)

    schedule = crontab(minute=cron_min)
    task_name = 'record_racerdata_%s_%s' % (int(time.time()), teamname)
    periodic_task(schedule, name=task_name)(wrapper)

record_racerdata('PR2W', '*/1')
record_racerdata('SNAAKE', '*/1')


def get_teamdata(teamname, cron_min):
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


@task()
def record_teamdata(teamname, cron_day):
    def wrapper():
        get_teamdata(teamname, cron_day)

    schedule = crontab(day_of_week=cron_day)
    task_name = 'record_teamdata_%s_%s' % (int(time.time()), teamname)
    periodic_task(schedule, name=task_name)(wrapper)

record_teamdata('PR2W', '1')
record_teamdata('SNAAKE', '1')
