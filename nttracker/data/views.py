from django.shortcuts import render
from django.http import JsonResponse

from .models import RaceData, RacerLog, RacerData, TeamData


def racedata_json(request, team_id):
    # deal with backslash-end bug
    data = list(RaceData.objects.filter(team_id__exact=team_id).values())
    return JsonResponse({'racedata': data})


def racerlog_json(request, team_id):
    data = list(RacerLog.objects.filter(team_id__exact=team_id).values())
    return JsonResponse({'racerlog': data})


def racerdata_json(request, team_id):
    data = list(RacerData.objects.filter(team_id__exact=team_id).values())
    return JsonResponse({'racerdata': data})


def teamdata_json(request, team_id):
    data = list(TeamData.objects.filter(team_id__exact=team_id).values())
    return JsonResponse({'teamdata': data})


def racedata_json_all(request):
    data = list(RaceData.objects.values())
    return JsonResponse({'racedata': data})


def racerlog_json_all(request):
    data = list(RacerLog.objects.values())
    return JsonResponse({'racerlog': data})


def racerdata_json_all(request):
    data = list(RacerData.objects.values())
    return JsonResponse({'racerdata': data})


def teamdata_json_all(request):
    data = list(TeamData.objects.values())
    return JsonResponse({'teamdata': data})
