from django.urls import path, re_path

from . import views


urlpatterns = [
    path('racedata_json/<int:team_id>/', views.racedata_json, name='racedata_json'),
    path('racerlog_json/<int:team_id>/', views.racerlog_json, name='racerlog_json'),
    path('racerdata_json/<int:team_id>/', views.racerdata_json, name='racerdata_json'),
    path('teamdata_json/<int:team_id>/', views.teamdata_json, name='teamdata_json'),
]
