from django.urls import path

from . import views
from .views import ExamenfileView, MedecinViewSet

app_name = 'examen'


urlpatterns = [

    path('examens/', views.ExamenView.as_view()),
    path('medecins/', views.MedecinViewSet.as_view()),
    path('exam/<int:pk>/', views.get_delete_update.as_view(), name='get_delete_update '),
    #path('file/<int:exam>/', ExamenfileView.as_view()),
    path('file/', ExamenfileView.as_view()),
    path('listUsersMedecin/', MedecinViewSet.as_view()),
    path('userId/<int:pk>/', views.UserIdViewSet.as_view()),
    ]