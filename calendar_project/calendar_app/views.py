from django.shortcuts import render, redirect
import calendar
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from .models import Event
from .forms import EventForms
from calendar_project.env.calendar_parts.date_time_calendar import cal_gen, month_last_day
from calendar_project.env.calendar_parts import date_time_calendar
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from .serializers import EventSerializer

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def clandar(request, year, month):
    last_Day = month_last_day(year, month)
    request_month = int(month)
    print(request_month)
    request_year = int(year)
    month0, month1, month2, cal, year_new, todays_date, cal_date = cal_gen(request_month, request_year)
    month1 = month1.title()
    month_number = list(calendar.month_name).index(month1)
    month_number = int(month_number) 
    next_year = year_new + 1
    last_year = year_new - 1
    
    events_list = Event.objects.filter(date__range=[f"{year}-{month}-01", f"{year}-{month}-{last_Day[1]}"])
    serialized_event_list = EventSerializer(events_list, many=True)
    
    data = {'year': year_new,
        'month1': month1,
        'month0':month0,
        'month2' :month2,
        'cal': cal,
        'last_year': last_year,
        'next_year': next_year,
        'todays_date': todays_date.isoformat(),
        'cal_date': cal_date.isoformat(),
        'events': serialized_event_list.data
        }

    return JsonResponse(data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_event(request):
    if request.method == 'POST':
        event_object = Event.objects.all()
        data = json.loads(request.body)
        formData  = data.get('data')
        
        subject = formData.get('subject')
        date = formData.get('date')
        start = formData.get('start')
        end = formData.get('end')
        event_type = formData.get('event_type')
        details = formData.get('details')
        
        event_object.create(
            subject = subject,
            date = date,
            start = start,
            end = end,
            event_type = event_type,
            details = details
        )
        resp = {'returned':'success'}
        return Response(resp)
    else:
        resp = {'returned':'wrong request method'}
        return Response(resp)
    
@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_event(request, id):
    event_to_delete = Event.objects.get(id=id)
    event_to_delete.delete()
    return HttpResponse({'response': 'success'})


@api_view(['PATCH'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_event(request, id):
    if request.method == 'PATCH':
        data = json.loads(request.body)
        formData  = data.get('data')
        event_object = Event.objects.get(id=id)
        event_object.subject = formData.get('subject')
        event_object.date = formData.get('date')
        event_object.start = formData.get('start')
        event_object.end = formData.get('end')
        event_object.event_type = formData.get('event_type')
        event_object.details = formData.get('details')
        event_object.save()
        resp = {'returned':'success'}
        return Response(resp)
    else:
        resp = {'returned':'wrong request method'}
        return Response(resp)