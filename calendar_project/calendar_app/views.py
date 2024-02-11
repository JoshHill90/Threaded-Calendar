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
from logs.logging_config import logging
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Request to get calendar data
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def clandar(request, year, month):
    if request.method == 'GET':
        try:
            # int check!!
            request_month = int(month)
            request_year = int(year)
            
            # get's the last day of the month 
            last_Day = month_last_day(year, month)
            # cal gen takes the year and month as int and returns calendar and it's attrabutes 
            month0, month1, month2, cal, year_new, todays_date, cal_date = cal_gen(request_month, request_year)
            month1 = month1.title()
            month_number = list(calendar.month_name).index(month1)
            month_number = int(month_number) 
            next_year = year_new + 1
            last_year = year_new - 1
            # pulls events for the givent mothn and year. 
            events_list = Event.objects.filter(date__range=[f"{request_year}-{request_month}-01", f"{request_year}-{request_month}-{last_Day[1]}"])
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
            # if the logic fails 
        except Exception as e:
            error_logged = f"Error in creating event {last_Day} \n {e} \n request infor {request}"
            logging.error(error_logged)
            return Response({'returned': error_logged})
        
    # not a post request
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        return Response(resp)  

# create new event request
@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_event(request):
    if request.method == 'POST':
        try:
            # pulls event model object
            event_object = Event.objects.all()
            # load data from form
            data = json.loads(request.body)
            formData  = data.get('data')
            # exact calendar data object
            subject = formData.get('subject')
            date = formData.get('date')
            start = formData.get('start')
            end = formData.get('end')
            event_type = formData.get('event_type')
            details = formData.get('details')
            # create event object
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
        
        # if the logic fails 
        except Exception as e:
            error_logged = f"Error in creating event {data} \n {e} \n request infor {request}"
            logging.error(error_logged)
            return Response({'returned': error_logged})
        
    # not a post request
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        return Response(resp)  
        
# Delete event request, with ID number   
@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_event(request, id):
    if request.method == 'DELETE':
        # delete logic
        try: 
            event_to_delete = Event.objects.get(id=id)
            event_to_delete.delete()
            return HttpResponse({'response': 'success'})
        # if the logic fails
        except Exception as e:
            error_logged = f"Error in deleting event {event_to_delete} \n {e} \n request infor {request}"
            logging.error(error_logged)
            return Response({'returned': error_logged})
    # not a delete request
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        
        return Response(resp)    

# request to update event by ID number
@api_view(['PATCH'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_event(request, id):
    # check if patch before tying to complete the logical process
    if request.method == 'PATCH':
        try:
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
        # if the logic fails
        except Exception as e:
            error_logged = f"Error in updating event {event_object} \n {e} \n request infor {request}"
            logging.error(error_logged)
            return Response({'returned': error_logged})
    # not a patch request
    else:
        resp = {'returned':'wrong request method'}
        logging.error("Error - wrong request method")
        
        return Response(resp)