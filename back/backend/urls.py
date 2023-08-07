from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

api_urls = [

    path('', include('authentification.urls')),
    #path('rest-auth/', include('rest_auth.urls'))
    path('', include('examen.urls')),

]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('backend/', include(api_urls)),
]
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)