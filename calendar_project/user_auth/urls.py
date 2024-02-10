
from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('api/v1/login/', views.login, name='login'),
    path('api/v1/signup/', views.signup, name='signup'),
    path('api/v1/logout/', views.logout, name='logout'),
] 