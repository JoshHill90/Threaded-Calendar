from django import forms
from .models import Event

class EventForms(forms.ModelForm):
    class Meta:
        model = Event
        fields = ('subject', 'user', 'date', 'start', 'end', 'event_type', 'details')
        widget ={
            'subject': forms.TextInput(attrs={'class': 'form-control'}),
            'user': forms.Select(attrs={'class': 'form-control'}),
            'date': forms.DateInput(attrs={'class': 'form-control'}),
            'start': forms.TimeInput(attrs={'class': 'form-control'}),
            'end': forms.TimeInput(attrs={'class': 'form-control'}),
            'event_type': forms.TextInput(attrs={'class': 'form-control'}),
            'details': forms.Textarea(attrs={'class': 'form-control'})  
        }