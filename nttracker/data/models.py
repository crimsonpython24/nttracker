from django.db import models


# Table 1: Main Data (preserved forever, updated once per 15 mins)
class RaceData(models.Model):
    id = models.BigAutoField(primary_key=True)
    racer_id = models.IntegerField()
    team_id = models.IntegerField()
    timestamp = models.IntegerField()
    races = models.IntegerField()
    time = models.IntegerField()
    typed = models.IntegerField()
    errs = models.IntegerField()


# Table 2: User information (one year, updated once per week)
class RacerLog(models.Model):
    id = models.BigAutoField(primary_key=True)
    racer_id = models.IntegerField()
    team_id = models.IntegerField()
    timestamp = models.IntegerField()
    username = models.CharField(max_length=200)
    display_name = models.CharField(max_length=100)
    total_races = models.IntegerField()
    speed = models.IntegerField()


# Table 3: User information (no history, updated every 15 mins)
class RacerData(models.Model):
    id = models.BigAutoField(primary_key=True)
    racer_id = models.IntegerField()
    timestamp = models.IntegerField()
    role = models.CharField(max_length=10)
    join_stamp = models.IntegerField()
    last_activity = models.IntegerField()
    last_login = models.IntegerField()


# Table 4: Team information (no history, updated once per week)
class TeamData(models.Model):
    id = models.BigAutoField(primary_key=True)
    team_id = models.IntegerField()
    timestamp = models.IntegerField()
    tag = models.CharField(max_length=10)
    tag_color = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
