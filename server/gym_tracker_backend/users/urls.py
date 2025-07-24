from django.contrib import admin
from django.urls import path
from .views import RegisterView, LoginView, MeView


urlpatterns = [
    path("register/", RegisterView.as_view() , name="register-endpoint"),
    path("login/", LoginView.as_view(), name="authentication-endpoint"),
    path("me/", MeView.as_view(), name="me-endpoint"),
]