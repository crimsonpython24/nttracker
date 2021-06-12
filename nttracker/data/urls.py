from django.urls import path

from . import views


urlpatterns = [
    path('racedata_json/', views.racedata_json, name='racedata_json'),
    path('racerlog_json/', views.racerlog_json, name='racerlog_json'),
    path('racerdata_json/', views.racerdata_json, name='racerdata_json'),
    path('teamdata_json/', views.teamdata_json, name='teamdata_json'),
]
