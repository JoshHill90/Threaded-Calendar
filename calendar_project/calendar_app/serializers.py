from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['subject', 'date', 'start', 'end', 'event_type', 'details']
