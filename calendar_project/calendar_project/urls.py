
from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('calendar_app.urls')),
    path('auth/', include('user_auth.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
