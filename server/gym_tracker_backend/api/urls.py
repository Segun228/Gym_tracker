from django.urls import path
from api.views import (

)

urlpatterns = [
    path('workouts/', pass, name='workout-list'),
    path('workouts/<int:workout_id>/', pass, name='workout-detail'),

    path('workouts/<int:workout_id>/exercises/', pass, name='exercise-list'),
    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/', pass, name='exercise-detail'),

    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/sets/', pass, name='set-list'),
    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/sets/<int:set_id>/', pass, name='set-detail'),

    path('templates/', pass, name='template-list'),
    path('templates/<int:template_id>/', pass, name='template-detail'),
]