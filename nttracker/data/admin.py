from django.contrib import admin

from .models import RaceData, RacerLog, RacerData, TeamData


admin.site.register(RaceData)
admin.site.register(RacerLog)
admin.site.register(RacerData)
admin.site.register(TeamData)
