from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import Context, loader


from guest.models import GuestForm

def home(request):
    if request.method == "POST":
        form = GuestForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/thanks/")
    else:
        form = GuestForm()

    return render(request, "index.html", {
        "form": form,
    })

def thanks(request):
    t = loader.get_template('thanks.html')
    c = Context({
        })
    return HttpResponse(t.render(c))
