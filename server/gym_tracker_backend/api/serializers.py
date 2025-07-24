from rest_framework.serializers import ModelSerializer
from api.models import ExerciseTemplate, Workout, WorkoutExercise, Set

class ExerciseTemplateSerializer(ModelSerializer):
    class Meta:
        model = ExerciseTemplate
        fields = ["name", "muscle_group"]


class WorkoutSerializer(ModelSerializer):
    class Meta:
        model = Workout
        fields = ["note", "duration"]


class WorkoutExerciseSerializer(ModelSerializer):
    class Meta:
        model = WorkoutExercise
        fields = ["template_id", "order"]


class SetSerializer(ModelSerializer):
    class Meta:
        model = Set
        fields = ["weight", "reps", "duration", "order"]