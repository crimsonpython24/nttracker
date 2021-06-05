from django.db import models
from django.contrib.postgres.fields import ArrayField



#   members    | char  | dealing with incoming/leaving members  | compare w/ prev. datasheet, check if player exists
#   teams      |  obj  | internal team comps, IF ANY            | 
#   prize      | char  | state the prize                        | simply return `charfield`
#   ranking    |  obj  | formula (weighted race/acc/pt)         | only record; sort in frontend
#   entry_req  |  obj  | entry requirement, IF ANY              | go thru previous datasheet and filter disqualified
#   exclusions | int[] | a list of excluded players, IF ANY     |


class Event(models.Model):
    members = models.CharField(choices=MEMBER_CHOICES, max_length=100)
    teams = models.ForeignKey(Subteam, blank=True, null=True, on_delete=models.CASCADE)
    prize = models.CharFIeld(max_length=300)
    ranking = models.ForeignKey(Ranking, on_delete=models.CASCADE)
    entry_req = models.ForeignKey(Requirement, blank=True, null=True, on_delete=models.CASCADE)
    exclusions = ArrayField(models.IntegerField(max_length=200), blank=True, null=True)



class EventSeries(models.Model):
    pass
