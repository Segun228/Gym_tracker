from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUser(AbstractUser):
    user_vk_id = models.CharField(max_length=100, null=False, blank=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.username}"
