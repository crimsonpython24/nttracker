from django.shortcuts import render
from django.http import JsonResponse

from .models import RaceData, RacerLog, RacerData, TeamData


def racedata_json(request):
    data = list(RaceData.objects.values())
    return JsonResponse({'racedata': data})


def racerlog_json(request):
    data = list(RacerLog.objects.values())
    return JsonResponse({'racerlog': data})


def racerdata_json(request):
    data = list(RacerData.objects.values())
    return JsonResponse({'racerdata': data})


def teamdata_json(request):
    data = list(TeamData.objects.values())
    return JsonResponse({'teamdata': data})
