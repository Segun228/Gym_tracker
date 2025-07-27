from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import AppUserSerializer
from .handle_sign import handle_sign
from django.http import HttpResponseForbidden
from .models import AppUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AppUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AppUserSerializer(data=request.data)
        auth_header = request.headers.get('Authorization', "")
        if not auth_header.startswith("VK "):
            return HttpResponseForbidden("Missing VK header")
        encoded_json = auth_header.replace("VK ", "")
        vk_data = handle_sign(encoded_json)
        if not vk_data:
            return HttpResponseForbidden("invalid app vk_data")
        else:
            vk_user_id = vk_data.get("vk_user_id")
            if not vk_user_id:
                return HttpResponseForbidden("Missing vk_user_id")
            user, created = AppUser.objects.get_or_create(vk_user_id=vk_user_id)
            if created:
                user.username = vk_data.get("vk_name") or ""
                user.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            })


class RefreshView(TokenRefreshView):
    permission_classes = [AllowAny]



class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = AppUserSerializer(request.user)
        return Response(serializer.data)