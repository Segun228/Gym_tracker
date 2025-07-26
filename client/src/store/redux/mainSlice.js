import { createSlice } from "@reduxjs/toolkit";


const mainSlice = createSlice({
    name: 'main',
    initialState: {
        username: "",
        vk_id: null,
        height: 170,
        weight: 70,
        workouts: [
            {
                "id": 1,
                "user_id": 42,
                "date": "2025-07-20",
                "note": "Upper body workout",
                "duration": "01:10:00",
                "callories_burnt": 450,
                "workout_exercises": [
                {
                    "id": 101,
                    "order": 1,
                    "template": {
                    "id": 1,
                    "name": "Bench Press",
                    "muscle_group": "Chest"
                    },
                    "sets": [
                    { "id": 1001, "weight": 60, "reps": 10, "order": 1 },
                    { "id": 1002, "weight": 65, "reps": 8, "order": 2 },
                    { "id": 1003, "weight": 70, "reps": 6, "order": 3 }
                    ]
                },
                {
                    "id": 102,
                    "order": 2,
                    "template": {
                    "id": 2,
                    "name": "Pull Ups",
                    "muscle_group": "Back"
                    },
                    "sets": [
                    { "id": 1004, "weight": 0, "reps": 12, "order": 1 },
                    { "id": 1005, "weight": 0, "reps": 10, "order": 2 }
                    ]
                }
                ]
            },
            {
                "id": 2,
                "user_id": 42,
                "date": "2025-07-22",
                "note": "Leg day",
                "duration": "01:00:00",
                "callories_burnt": 520,
                "workout_exercises": [
                {
                    "id": 103,
                    "order": 1,
                    "template": {
                    "id": 3,
                    "name": "Squats",
                    "muscle_group": "Legs"
                    },
                    "sets": [
                    { "id": 1006, "weight": 80, "reps": 10, "order": 1 },
                    { "id": 1007, "weight": 85, "reps": 8, "order": 2 }
                    ]
                },
                {
                    "id": 104,
                    "order": 2,
                    "template": {
                    "id": 4,
                    "name": "Leg Curl",
                    "muscle_group": "Hamstrings"
                    },
                    "sets": [
                    { "id": 1008, "weight": 40, "reps": 12, "order": 1 },
                    { "id": 1009, "weight": 45, "reps": 10, "order": 2 }
                    ]
                }
                ]
            }
        ],
        templates: [
            {
                "id": 1,
                "user_id": 101,
                "name": "Bench Press",
                "muscle_group": "Chest",
                "created_at": "2025-06-01T12:00:00Z",
                "updated_at": "2025-06-10T10:00:00Z"
            },
            {
                "id": 2,
                "user_id": 101,
                "name": "Deadlift",
                "muscle_group": "Back",
                "created_at": "2025-06-05T08:30:00Z",
                "updated_at": "2025-06-15T09:00:00Z"
            },
            {
                "id": 3,
                "user_id": 101,
                "name": "Squat",
                "muscle_group": "Legs",
                "created_at": "2025-06-10T14:00:00Z",
                "updated_at": "2025-06-20T15:00:00Z"
            }
        ]
    },
    reducers:{
        setUser(state, action){
            state.username = action.payload?.username || state.username
            state.vk_id = action.payload?.vk_id || state.vk_id
            state.height = action.payload?.height || state.height
            state.weight = action.payload?.weight || state.weight
        },

        deleteUser(state, action){
            state.username = ""
            state.vk_id = ""
            state.height = 170
            state.weight = 70
        },

        clearStorage(state, action){
            state.username = ""
            state.vk_id = ""
            state.height = 170
            state.weight = 70
            state.workouts = []
            state.templates = []
        },

        setWorkouts(state, action){
            state.workouts = action.payload.workouts
        },

        addWorkout(state, action){
            state.workouts.push(action.payload.workout)
        },

        editWorkout(state, action) {
            const updatedWorkout = action.payload.workout;
            const index = state.workouts.findIndex(w => w.id === updatedWorkout.id);
            if (index !== -1) {
                state.workouts[index] = updatedWorkout;
            }
        },

        deleteWorkout(state, action){
            state.workouts = state.main.workouts.filter(workout => workout?.id !== action.payload.id)
        },

        setTemplates(state, action) {
            state.templates = action.payload.templates;
        },

        addTemplate(state, action) {
            state.templates.push(action.payload.template);
        },

        editTemplate(state, action) {
            const updatedTemplate = action.payload.template;
            const index = state.templates.findIndex(t => t.id === updatedTemplate.id);
            if (index !== -1) {
                state.templates[index] = updatedTemplate;
            }
        },

        deleteTemplate(state, action) {
            const templateId = action.payload.templateId;
            state.templates = state.templates.filter(t => t.id !== templateId);
        },

        setExercises(state, action) {
            const { workoutId, exercises } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                workout.workout_exercises = exercises;
            }
        },

        addExercise(state, action) {
            const { workoutId, exercise } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                workout.workout_exercises.push(exercise);
            }
        },

        editExercise(state, action) {
            const { workoutId, exercise } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                const index = workout.workout_exercises.findIndex(e => e.id === exercise.id);
                if (index !== -1) {
                workout.workout_exercises[index] = exercise;
                }
            }
        },

        deleteExercise(state, action) {
            const { workoutId, exerciseId } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                workout.workout_exercises = workout.workout_exercises.filter(e => e.id !== exerciseId);
            }
        },

        setSet(state, action) {
            const { workoutId, exerciseId, sets } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id === exerciseId);
                if (exercise) {
                exercise.sets = sets;
                }
            }
        },

        addSet(state, action) {
            const { workoutId, exerciseId, set } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id === exerciseId);
                if (exercise) {
                exercise.sets.push(set);
                }
            }
        },

        editSet(state, action) {
            const { workoutId, exerciseId, set } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id === exerciseId);
                if (exercise) {
                const index = exercise.sets.findIndex(s => s.id === set.id);
                if (index !== -1) {
                    exercise.sets[index] = set;
                }
                }
            }
        },

        deleteSet(state, action) {
            const { workoutId, exerciseId, setId } = action.payload;
            const workout = state.workouts.find(w => w.id === workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id === exerciseId);
                if (exercise) {
                exercise.sets = exercise.sets.filter(s => s.id !== setId);
                }
            }
        },
    }
}
)

export const { 

} = mainSlice.actions;

export const mainReducer = mainSlice.reducer;