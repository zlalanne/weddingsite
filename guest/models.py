from django.db import models
from django.forms import ModelForm

class Guest(models.Model):
    name = models.CharField(max_length=200)
    adults = models.IntegerField()
    children = models.IntegerField()
    attending = models.BooleanField()
    song = models.TextField(blank=True)

    def __unicode__(self):
        return self.name

class GuestForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super(ModelForm, self).__init__(*args, **kwargs)
        self.fields["name"].widget.attrs['class'] = 'rsvp_field'

    class Meta:
        model = Guest
        fields = ["name", "adults", "children", "attending", "song"]


