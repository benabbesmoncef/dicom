from django.db import models
# from authentification.models import Subscriber
# Create your models here.
from django.conf import settings


class Examen(models.Model):
    medecin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='medecin')
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient')
    #patient = models.PositiveIntegerField(default=0)
    creation_date= models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)
    valide = models.BooleanField()
    # file = models.FileField(blank=False, null=False, default="")
    examen_compte_rendu = models.CharField(max_length=500, default="")
    IRM = 'IRM'
    SCANNER = 'SCANNER'
    ECHOGRAPHIE = 'ECHOGRAPHIE'
    FIBROSCOPIE = 'FIBROSCOPIE'
    MAMMOGRAPHIE = 'MAMMOGRAPHIE'
    EXAMEN_TYPE_CHOICES = (
        (IRM, 'IRM'),
        (SCANNER, 'Scanner'),
        (ECHOGRAPHIE, 'Échographie'),
        (FIBROSCOPIE, 'Fibroscopie'),
        (MAMMOGRAPHIE, 'Mammographie'),
    )
    examen_type = models.CharField(max_length=15, choices=EXAMEN_TYPE_CHOICES, default=IRM)

class ExamenFile(models.Model):
    examen = models.ForeignKey(Examen, on_delete=models.CASCADE, null=True, blank=True, related_name='examen')
    content = models.FileField(blank=False, null=False)
    creation_date = models.DateTimeField(auto_now_add=True)
    edit_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.file.name

