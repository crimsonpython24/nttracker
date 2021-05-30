from django.urls import path

from . import views

from frontend import views as f_views

urlpatterns = [
    path('ajaxlogin', views.ajax_login, name='ajaxlogin'),
    path('teststate', views.test_state, name='teststate'),
    
    path('login', f_views.index, name='index'),
]
