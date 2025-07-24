from rest_framework.serializers import ModelSerializer
from users.models import AppUser


class AppUserSerializer(ModelSerializer):
    class Meta:
        model = AppUser
        fields = ["username", "user_vk_id", "height", "weight" ]