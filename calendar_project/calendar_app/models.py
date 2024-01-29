from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User
import datetime

def date_stamp():
    date_and_time = datetime.datetime.now()
    dates = date_and_time.date()
    times = date_and_time.strftime("%I:%M:%S %p")
    date = str(dates)
    time = str(times)
    print(date)
    return date


class Event(models.Model):

    subject = models.CharField(max_length=255)
    date = models.DateField(default=date_stamp())
    start = models.TimeField(blank=True, null=True)
    end = models.TimeField(blank=True, null=True)
    event_type = models.CharField(max_length=50, blank=True)
    details = models.CharField(max_length=500, blank=True)

    
    def __str__(self):
        return str(self.subject)

    def get_absolute_url(self):
        return reverse("calendar")