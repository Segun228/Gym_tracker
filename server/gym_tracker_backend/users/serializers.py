from rest_framework.serializers import ModelSerializer
from users.models import AppUser


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = "__all__"