"""
WSGI config for weddingsite project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "weddingsite.settings")

from django.core.wsgi import get_wsgi_application
from dj_static import Cling

import newrelic.agent
newrelic.agent.initialize(os.path.join(os.path.dirname(__file__),'newrelic.ini'))

application = Cling(get_wsgi_application())
