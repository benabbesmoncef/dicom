from django.urls import path
from .views import PatientRegistrationAPIView, UserLoginAPIView, UserTokenAPIView, MedecinRegistrationAPIView, \
    UserTypeViewSet, ListUsersViewSet

app_name = 'users'

urlpatterns = [
    path('patient/', PatientRegistrationAPIView.as_view(), name="list"),
    path('medecin/', MedecinRegistrationAPIView.as_view(), name="list"),
    path('userType/', UserTypeViewSet.as_view()),
    path('listUsers/', ListUsersViewSet.as_view()),
    path('users/login/', UserLoginAPIView.as_view(), name="login"),
    path('tokens/<key>/', UserTokenAPIView.as_view(), name="token"),
]
