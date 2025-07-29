import { createSlice } from "@reduxjs/toolkit";
import {getThunkWorkouts} from "./thunks/getThunkWorkouts"
import { getThunkTemplates } from "./thunks/getThunkTemplates";
import { getThunkMe } from "./thunks/getThunkMe";
import { workouts } from "./dummy/workouts";
import { templates } from "./dummy/templates";
const mainSlice = createSlice({
    name: 'main',
    initialState: {
        username: null,
        status: "idle",
        error: null,
        vk_user_id: null,
        height: 170,
        weight: 70,
        workouts: workouts,
        templates: templates
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getThunkWorkouts.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getThunkWorkouts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.workouts = action.payload
            })
            .addCase(getThunkWorkouts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || action.error.message
            })
        
        builder
            .addCase(getThunkTemplates.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getThunkTemplates.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.templates = action.payload
            })
            .addCase(getThunkTemplates.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || action.error.message
            })

        builder
            .addCase(getThunkMe.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(getThunkMe.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.username = action.payload?.username
                state.vk_user_id = action.payload?.vk_user_id
                state.height = action.payload?.height || state.height
                state.weight = action.payload?.weight || state.weight
            })
            .addCase(getThunkMe.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload || action.error.message
            })
    }
}
)

export const { 
    setUser,
    deleteUser,
    clearStorage,
    setWorkouts,
    addWorkout,
    editWorkout,
    deleteWorkout,
    setTemplates,
    addTemplate,
    editTemplate,
    deleteTemplate,
    setExercises,
    addExercise,
    editExercise,
    deleteExercise,
    setSet,
    addSet,
    editSet,
    deleteSet
} = mainSlice.actions;

export const mainReducer = mainSlice.reducer;