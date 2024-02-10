from django.contrib import admin
from django.urls import path
from .views import *
from . import views

urlpatterns = [
    
    path('api/v1/calendar/<int:year>/<int:month>/', views.clandar, name='calendar'),
    path('api/v1/calendar/new-event/', views.add_event, name='new-event'),
    path('api/v1/calendar/delete-event/<int:id>/', views.delete_event, name='delete-event'),
    path('api/v1/calendar/update-event/<int:id>/', views.update_event, name='update-event'),
] 