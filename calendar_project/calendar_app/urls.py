from django.contrib import admin
from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/v1/calendar/<int:year>/<int:month>/', views.clandar, name='calendar'),
    path('api/v1/calendar/new-event/', views.add_event, name='newEvent'),
] 