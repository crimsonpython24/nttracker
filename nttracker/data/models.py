from django.db import models

from django_unixdatetimefield import UnixDateTimeField


class Racer(models.Model):
    racer_id = models.IntegerField(primary_key=True)
    races = models.IntegerField()
    time = models.IntegerField()
    typed = models.IntegerField()
    errs = models.IntegerField()
    joinStamp = UnixDateTimeField()
    lastActivity = models.IntegerField()
    role = models.CharField(max_length=10)
    username = models.CharField(max_length=200)
    display_name = models.CharField(max_length=100)
    total_races = models.IntegerField()
    speed = models.IntegerField()
    last_login = UnixDateTimeField()


class RaceData(models.Model):
    timestamp = UnixDateTimeField(primary_key=True)
    team_id = models.IntegerField()
    tag = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    members = models.ForeignKey(Racer, on_delete=models.CASCADE)
