# from authentification import serializers
from authentification.models import Subscriber
from authentification.serializers import BasicSubscriberSerializer
from .models import Examen
from .models import ExamenFile
from rest_framework import serializers




class ExamenSerializer(serializers.ModelSerializer):
    # id_patient = serializers.CharField(write_only=True,default="2")
    # id_doctor = serializers.CharField(write_only=True,default="3")
    # patient_obj= serializers.SerializerMethodField('get_patient_object')
    # def get_patient_object(self):
    #     obj=Subscriber.objects.filter(pk=self.re)
    medecin_obj = serializers.SerializerMethodField('get_object_med')

    def get_object_med(self, obj):
        try:
            obj = Subscriber.objects.get(pk=obj.medecin.id)
            return BasicSubscriberSerializer(obj).data
        except Subscriber.DoesNotExist:
            return None
        except Exception as e:
            print(str(e))

    class Meta:
        model = Examen
        # fields= "__all__"
        fields = ['pk',
                  'examen_type',
                  'examen_compte_rendu',
                  'medecin',
                  'medecin_obj',
                  'patient',
                  'valide'
                  ]


class ExamenfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamenFile
        fields = "__all__"
