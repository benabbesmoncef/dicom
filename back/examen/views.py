# from rest_framework.authtoken.models import Token
#
# from django.http import JsonResponse, Http404
# from django.views.decorators.csrf import csrf_exempt
from django.http.multipartparser import MultiPartParser
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
# from rest_framework.mixins import CreateModelMixin
# from rest_framework.parsers import JSONParser
from rest_framework.parsers import FileUploadParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authentification.serializers import PatientRegistrationSerializer
from authentification.serializers import MedecinRegistrationSerializer
from authentification.models import Subscriber
from .models import Examen, ExamenFile
from .permissions import IsOwnerOrReadOnly
from .serializers import ExamenSerializer, ExamenfileSerializer
from rest_framework import viewsets, status


class ExamenView(CreateAPIView):
    serializer_class = ExamenSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        examen = Examen.objects.all()
        return examen

    def get(self, request):
        queryset = self.get_queryset()
        examen = queryset.filter(patient=request.user)

        paginate_queryset = self.paginate_queryset(examen)
        serializer = self.serializer_class(examen, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExamenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(patient=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class get_delete_update(RetrieveUpdateDestroyAPIView):
    serializer_class = ExamenSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self, pk):
        try:
            examen = Examen.objects.get(pk=pk)
        except Examen.DoesNotExist:
            content = {
                'status': 'Not Found'
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        return examen

    def get(self, request, pk):

        examen = self.get_queryset(pk)
        serializer = ExamenSerializer(examen)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        try:

            examen = self.get_queryset(pk)

            if (request.user == examen.patient):  # If creator is who makes request
                serializer = ExamenSerializer(examen, data=request.data)
                if serializer.is_valid():
                 serializer.save(patient=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                content = {
                    'status': 'UNAUTHORIZED'
                }
                return Response(content, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return str(e)

    def delete(self, request, pk):

        examen = self.get_queryset(pk)

        if (request.user == examen.patient):  # If creator is who makes request
            examen.delete()
            content = {
                'status': 'NO CONTENT'
            }
            return Response(content, status=status.HTTP_204_NO_CONTENT)
        else:
            content = {
                'status': 'UNAUTHORIZED'
            }
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)


class MedecinViewSet(APIView):
    def get(self, request):
        doc_obj = Subscriber.objects.filter(role_subscriber=2)
        return Response(PatientRegistrationSerializer(doc_obj, many=True).data)


class ExamenfileView(APIView):
    serializer_class = ExamenfileSerializer
    parser_class = (MultiPartParser, FormParser)# MultiPartParser, FormParser FileUploadParser
    object = ExamenView()
    def post(self, request, *args, **kwargs):

        file_serializer = ExamenfileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        examenfile = ExamenFile.objects.all()
        return examenfile

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        exam_id= kwargs.get('exam_id', 215)
        examenfile = queryset.filter(examen_id=exam_id)
        serializer = self.serializer_class(examenfile, many=True)
        return Response(serializer.data)

    # def get(self, exam):
    #     print(exam)
    #     queryset = self.get_queryset()
    #     examenfile = queryset.filter(examen_id=exam)
    #     serializer = self.serializer_class(examenfile, many=True)
    #     return Response(serializer.data)

class UserIdViewSet(APIView):
    def get_queryset(self, pk):
        try:
            userid = Subscriber.objects.get(pk=pk)
        except Subscriber.DoesNotExist:
            content = {
                'status': 'Not Found'
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        return userid

    def get(self, request, pk):

        userid = self.get_queryset(pk)
        serializer = PatientRegistrationSerializer(userid)
        return Response(serializer.data, status=status.HTTP_200_OK)