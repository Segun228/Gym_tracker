from rest_framework import mixins
from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import AllowAny
from .serializers import WorkoutSerializer, WorkoutExerciseSerializer, SetSerializer, ExerciseTemplateSerializer
from .serializers import SetReadSerializer, WorkoutExerciseReadSerializer, WorkoutReadSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, GenericAPIView
from .models import Set, Workout, WorkoutExercise, ExerciseTemplate
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Workout, WorkoutExercise, Set
from .serializers import WorkoutSerializer, WorkoutExerciseSerializer, SetSerializer



class ListCreateTemplate(ListCreateAPIView):
    serializer_class = ExerciseTemplateSerializer
    permission_classes = [AllowAny]
    queryset = ExerciseTemplate.objects.all()


class RetrieveUpdateDestroyTemplate(RetrieveUpdateDestroyAPIView):
    serializer_class = ExerciseTemplateSerializer
    permission_classes = [AllowAny]
    queryset = ExerciseTemplate.objects.all()


class WorkoutListCreateView(ListCreateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user_id=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)




class WorkoutRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user_id=self.request.user)



class WorkoutExerciseListCreateView(ListCreateAPIView):
    serializer_class = WorkoutExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkoutExercise.objects.filter(workout_id=self.kwargs['workout_id'], workout_id__user_id=self.request.user)

    def perform_create(self, serializer):
        workout = Workout.objects.get(pk=self.kwargs['workout_id'], user_id=self.request.user)
        serializer.save(workout_id=workout)


class WorkoutExerciseRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = WorkoutExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WorkoutExercise.objects.filter(pk=self.kwargs['exercise_id'], workout_id__user_id=self.request.user)



class SetListCreateView(ListCreateAPIView):
    serializer_class = SetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Set.objects.filter(workout_exercise_id=self.kwargs['exercise_id'], workout_exercise_id__workout_id__user_id=self.request.user)

    def perform_create(self, serializer):
        exercise = WorkoutExercise.objects.get(pk=self.kwargs['exercise_id'], workout_id__user_id=self.request.user)
        serializer.save(workout_exercise_id=exercise)


class SetRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = SetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Set.objects.filter(pk=self.kwargs['set_id'], workout_exercise_id__workout_id__user_id=self.request.user)