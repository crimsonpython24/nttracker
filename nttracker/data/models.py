from django.db import models

from django_unixdatetimefield import UnixDateTimeField


# Table 1: Main Data (preserved forever)
class RaceData(models.Model):
    racer_id = models.IntegerField(primary_key=True)
    team_id = models.IntegerField()
    timestamp = UnixDateTimeField()
    races = models.IntegerField()
    time = models.IntegerField()
    typed = models.IntegerField()
    errs = models.IntegerField()


# Table 2: User information (one year, updated once per week)
class RacerLog(models.Model):
    racer_id = models.IntegerField(primary_key=True)
    team_id = models.IntegerField()
    role = models.CharField(max_length=10)
    username = models.CharField(max_length=200)
    display_name = models.CharField(max_length=100)
    total_races = models.IntegerField()
    speed = models.IntegerField()


# Table 3: User information (no history)
class RacerData(models.Model):
    racer_id = models.IntegerField(primary_key=True)
    joinStamp = UnixDateTimeField()
    lastActivity = models.IntegerField()
    last_login = UnixDateTimeField()


# Table 4: Team information (no history)
class TeamData(models.Model):
    team_id = models.IntegerField(primary_key=True)
    tag = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
