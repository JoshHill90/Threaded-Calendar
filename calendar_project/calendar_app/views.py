from django.shortcuts import render, redirect
import calendar
from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import Event
from .forms import EventForms
from calendar_project.env.calendar_parts.date_time_calendar import cal_gen
from calendar_project.env.calendar_parts import date_time_calendar
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
#from .serializers import ImageSerializer
@api_view(['GET'])
def clandar(request, year, month):
    request_month = int(month)
    print(request_month)
    request_year = int(year)
    month0, month1, month2, cal, year_new, todays_date, cal_date = cal_gen(request_month, request_year)
    month1 = month1.title()
    month_number = list(calendar.month_name).index(month1)
    month_number = int(month_number) 
    next_year = year_new + 1
    last_year = year_new - 1

    data = {'year': year_new,
        'month1': month1,
        'month0':month0,
        'month2' :month2,
        'cal': cal,
        'last_year': last_year,
        'next_year': next_year,
        'todays_date': todays_date.isoformat(),
        'cal_date': cal_date.isoformat()
        }

    return HttpResponse(json.dumps(data))
    
def index(request):
    users = User.objects.all()
    event_list = Event.objects.all()
    event_list = Event.objects.order_by('date')
    month0, month1, month2, cal, year_new, todays_date, cal_date = cal_gen()
    month1 = month1.title()
    month_number = list(calendar.month_name).index(month1)
    month_number = int(month_number) 
    new_template = None

    next_year = year_new + 1
    last_year = year_new - 1
    
    
    # Form validation and approval workflow
    if request.method == 'POST':
        event_form = EventForms(data=request.POST)
        if event_form.is_valid():
            
            new_event = event_form.save(commit=False)
            
            new_event.save()
            
            return redirect('index')
        
    if request.method == 'PUT':
        event_form = EventForms(data=request.PUT)
        if event_form.is_valid():
            
            new_event = event_form.save(commit=False)
            
            new_event.save()
            
            return redirect('index')
            
    elif request.method == 'DELETE':
            
        event_id = request.GET.get('id')
        if event_id:
            event  = Event.objects.get(pk=event_id)
            event.delete()
            
            return redirect('index')

            
    else: 
        event_form = EventForms()
        
    return render(request, 'index.html', {
        
        'year': year_new,
        'month1': month1,
        'month0':month0,
        'month2' :month2,
        'cal': cal,
        'event_list':event_list,
        'last_year': last_year,
        'next_year': next_year,
        'todays_date': todays_date,
        'cal_date': cal_date, 
        'form1': event_form,
        'users': users
    })