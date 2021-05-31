from django.urls import path
from django.contrib.auth.views import LogoutView

from . import views
from frontend import views as f_views


urlpatterns = [
    path('ajaxlogin', views.ajax_login, name='ajaxlogin'),
    path('ajaxprofile', views.ajax_profile, name='ajaxprofile'),
    path('ajaxlogout', views.ajax_logout, name='ajaxlogout'),
    path('ajaxprofile', views.ajax_profile, name='ajaxprofile'),
    path('teststate', views.test_state, name='teststate'),
    path('initstate', views.init_state, name='initstate'),
    
    path('login', f_views.index, name='index'),
    path('profile', f_views.index, name='index'),
]
