from django.urls import path
from api.views import (
    ListCreateTemplate, 
    RetrieveUpdateDestroyTemplate, 
    WorkoutListView,
    WorkoutCreateView,
    WorkoutRetrieveView,
    WorkoutUpdateDestroyView,
    WorkoutExerciseListView,
    WorkoutExerciseCreateView,
    WorkoutExerciseRetrieveView,
    WorkoutExerciseUpdateDestroyView,
    SetCreateView,
    SetRetrieveView,
    SetListView,
    SetUpdateDestroyView
)


urlpatterns = [
    path('workouts/', WorkoutListView.as_view(), name='workout-list'),
    path('workouts/', WorkoutCreateView.as_view(), name='workout-create'),
    path('workouts/<int:workout_id>/', WorkoutRetrieveView.as_view(), name='workout-detail'),
    path('workouts/<int:workout_id>/', WorkoutUpdateDestroyView.as_view(), name='workout-update-destroy'),

    path('workouts/<int:workout_id>/exercises/', WorkoutExerciseListView.as_view(), name='exercise-list'),
    path('workouts/<int:workout_id>/exercises/', WorkoutExerciseCreateView.as_view(), name='exercise-create'),
    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/', WorkoutExerciseRetrieveView.as_view(), name='exercise-detail'),
    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/', WorkoutExerciseUpdateDestroyView.as_view(), name='exercise-update-destroy'),

    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/sets/', SetListView.as_view(), name='set-list'),
    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/sets/', SetCreateView.as_view(), name='set-create'),
    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/sets/<int:set_id>/', SetRetrieveView.as_view(), name='set-detail'),
    path('workouts/<int:workout_id>/exercises/<int:exercise_id>/sets/<int:set_id>/', SetUpdateDestroyView.as_view(), name='set-update-destroy'),

    path('templates/', ListCreateTemplate.as_view(), name='template-list'),
    path('templates/<int:template_id>/', RetrieveUpdateDestroyTemplate.as_view(), name='template-detail'),
]