from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import Context, loader

import datetime

from guest.models import GuestForm


def home(request):

    current = datetime.datetime.now()
    wedding = datetime.datetime(2014, 7, 12)
    days = wedding - current
    days = days.days - 1

    if(days == 0):
        time = "Getting Married Today!"
    elif(days > 1):
        time = "{} Days Until We Get Married!".format(days)
    elif(days == 1):
        time = "Getting Married Tomorrow!"
    else:
        time = "Been Married for {} Days".format(abs(days))

    form = GuestForm()

    return render(request, "index.html", {
        "form": form,
        "time": time
    })


def thanks(request):

    if request.method == "POST":
        form = GuestForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, "thanks.html", { "submission": True,
                                                    "attending": form.cleaned_data["attending"],
                                                    "name": form.cleaned_data["name"],
                                                    "adults": form.cleaned_data["adults"],
                                                    "children": form.cleaned_data["children"]})
        else:
            HttpResponseRedirect("/sorry/")
    else:
        return render(request, "thanks.html", {"submission": False})

def sorry(request):
    return render(request, "sorry.html")
