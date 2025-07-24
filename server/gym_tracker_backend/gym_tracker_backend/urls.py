from django.contrib import admin
from django.urls import path, include
from users.urls import urlpatterns as auth_urls
from api.urls import urlpatterns as api_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include(auth_urls), name="Authentication-endpoint-group"),
    path("api/", include(api_urls), name="API-endpoint-group"),
]
