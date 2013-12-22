from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'weddingsite.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^thanks/', 'weddingsite.views.thanks', name='thanks'),
)
