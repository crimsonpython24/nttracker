from django.urls import path, re_path

from . import views


urlpatterns = [
    path("racedata_json_all/", views.racedata_json_all, name="racedata_json"),
    path("racerlog_json_all/", views.racerlog_json_all, name="racerlog_json"),
    path("racerdata_json_all/", views.racerdata_json_all, name="racerdata_json"),
    path("teamdata_json_all/", views.teamdata_json_all, name="teamdata_json"),
    path("racedata_json/<int:team_id>/", views.racedata_json, name="racedata_json"),
    path("racerlog_json/<int:team_id>/", views.racerlog_json, name="racerlog_json"),
    path("racerdata_json/<int:team_id>/", views.racerdata_json, name="racerdata_json"),
    path("teamdata_json/<int:team_id>/", views.teamdata_json, name="teamdata_json"),
]
