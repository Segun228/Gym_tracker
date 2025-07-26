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
from rest_framework.permissions import AllowAny
from .models import Workout, WorkoutExercise, Set
from .serializers import WorkoutSerializer, WorkoutExerciseSerializer, SetSerializer
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404



class ListCreateTemplate(ListCreateAPIView):
    serializer_class = ExerciseTemplateSerializer
    permission_classes = [AllowAny]
    queryset = ExerciseTemplate.objects.all()


class RetrieveUpdateDestroyTemplate(RetrieveUpdateDestroyAPIView):
    serializer_class = ExerciseTemplateSerializer
    permission_classes = [AllowAny]
    queryset = ExerciseTemplate.objects.all()




class WorkoutListView(ListAPIView):
    serializer_class = WorkoutReadSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Workout.objects.filter(user_id=self.request.user)


class WorkoutCreateView(CreateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class WorkoutRetrieveView(RetrieveAPIView):
    serializer_class = WorkoutReadSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Workout.objects.filter(user_id=self.request.user)


class WorkoutUpdateDestroyView(DestroyAPIView, UpdateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Workout.objects.filter(user_id=self.request.user)






class WorkoutExerciseListView(ListAPIView):
    serializer_class = WorkoutExerciseReadSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return WorkoutExercise.objects.filter(workout_id=self.kwargs['workout_id'], workout_id__user_id=self.request.user)



class WorkoutExerciseCreateView(CreateAPIView):
    serializer_class = WorkoutExerciseSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        workout = get_object_or_404(Workout, pk=self.kwargs['workout_id'], user=self.request.user)
        serializer.save(workout=workout)


class WorkoutExerciseRetrieveView(RetrieveAPIView):
    serializer_class = WorkoutExerciseReadSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return WorkoutExercise.objects.filter(pk=self.kwargs['exercise_id'], workout_id__user_id=self.request.user)


class WorkoutExerciseUpdateDestroyView(UpdateAPIView, DestroyAPIView):
    serializer_class = WorkoutExerciseSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return WorkoutExercise.objects.filter(pk=self.kwargs['exercise_id'], workout_id__user_id=self.request.user)






class SetListView(ListAPIView):
    serializer_class = SetReadSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Set.objects.filter(workout_exercise_id=self.kwargs['exercise_id'], workout_exercise_id__workout_id__user_id=self.request.user)


class SetCreateView(CreateAPIView):
    serializer_class = SetSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        exercise = get_object_or_404(
            WorkoutExercise,
            pk=self.kwargs['exercise_id'],
            workout__user=self.request.user
        )
        serializer.save(workout_exercise_id=exercise)


class SetRetrieveView(RetrieveAPIView):
    serializer_class = SetReadSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Set.objects.filter(pk=self.kwargs['set_id'], workout_exercise_id__workout_id__user_id=self.request.user)


class SetUpdateDestroyView(UpdateAPIView, DestroyAPIView):
    serializer_class = SetSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Set.objects.filter(pk=self.kwargs['set_id'], workout_exercise_id__workout_id__user_id=self.request.user)