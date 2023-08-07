from django.contrib import admin
from .models import Examen
from .models import ExamenFile

admin.site.register(Examen)
admin.site.register(ExamenFile)