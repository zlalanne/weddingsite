from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import Context, loader

import datetime


from guest.models import GuestForm

def home(request):

    current = datetime.datetime.now()
    wedding = datetime.datetime(2014, 7, 12)
    days = wedding - current
    days = days.days

    if(days == 0):
        time = "Getting Married Today!"
    elif(days > 1):
        time = "{} Days Until Getting Married!".format(days)
    elif(days == 1):
        time = "Getting Married Tomorrow!"
    else:
        time = "Been Married for {} Days".format(abs(days))


    if request.method == "POST":
        form = GuestForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/thanks/")
    else:
        form = GuestForm()

    return render(request, "index.html", {
        "form": form,
        "time": time
    })

def thanks(request):
    t = loader.get_template('thanks.html')
    c = Context({
        })
    return HttpResponse(t.render(c))
