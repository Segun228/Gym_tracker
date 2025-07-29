import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = {
  HOME: 'home_view',
  REGISTRATION: 'registration_view',
  LOGIN: 'login_view',
  EXERCISES: 'exercises_view',
  WORKOUTS: 'workouts_view',
  EXACT_WORKOUT: 'exact_workout_view',
  WORKOUT_EXERCISE: 'exact_exercise_view',
};

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home_panel',
  REGISTRATION: 'registration_panel',
  LOGIN: 'login_panel',
  EXERCISES: 'exercises_panel',
  WORKOUTS: 'workouts_panel',
  EXACT_WORKOUT: 'exact_workout_panel',
  WORKOUT_EXERCISE: 'exact_exercise_panel',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW.HOME, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
    ]),
    createView(DEFAULT_VIEW.REGISTRATION, [
      createPanel(DEFAULT_VIEW_PANELS.REGISTRATION, '/registration', []),
    ]),
    createView(DEFAULT_VIEW.LOGIN, [
      createPanel(DEFAULT_VIEW_PANELS.LOGIN, '/login', []),
    ]),
    createView(DEFAULT_VIEW.EXERCISES, [
      createPanel(DEFAULT_VIEW_PANELS.EXERCISES, '/exercises', []),
    ]),
    createView(DEFAULT_VIEW.WORKOUTS, [
      createPanel(DEFAULT_VIEW_PANELS.WORKOUTS, '/workouts', []),
    ]),
    createView(DEFAULT_VIEW.EXACT_WORKOUT, [
      createPanel(DEFAULT_VIEW_PANELS.EXACT_WORKOUT, '/workouts/:workout_id', []),
    ]),
    createView(DEFAULT_VIEW.WORKOUT_EXERCISE, [
      createPanel(
        DEFAULT_VIEW_PANELS.WORKOUT_EXERCISE,
        '/workouts/:workout_id/exercises/:exercise_id',
        []
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());