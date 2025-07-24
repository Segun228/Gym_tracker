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

export const routes = [
  createRoot(DEFAULT_ROOT, [
    createView(
      DEFAULT_VIEW.HOME,
      [createPanel(DEFAULT_VIEW_PANELS.HOME)],
      { path: '/home' }
    ),
    createView(
      DEFAULT_VIEW.REGISTRATION,
      [createPanel(DEFAULT_VIEW_PANELS.REGISTRATION)],
      { path: '/registration' }
    ),
    createView(
      DEFAULT_VIEW.LOGIN,
      [createPanel(DEFAULT_VIEW_PANELS.LOGIN)],
      { path: '/login' }
    ),
    createView(
      DEFAULT_VIEW.EXERCISES,
      [createPanel(DEFAULT_VIEW_PANELS.EXERCISES)],
      { path: '/exercises' }
    ),
    createView(
      DEFAULT_VIEW.WORKOUTS,
      [createPanel(DEFAULT_VIEW_PANELS.WORKOUTS)],
      { path: '/workouts' }
    ),
    createView(
      DEFAULT_VIEW.EXACT_WORKOUT,
      [createPanel(DEFAULT_VIEW_PANELS.EXACT_WORKOUT)],
      { path: '/workouts/:workout_id' }
    ),
    createView(
      DEFAULT_VIEW.WORKOUT_EXERCISE,
      [createPanel(DEFAULT_VIEW_PANELS.WORKOUT_EXERCISE)],
      { path: '/workouts/:workout_id/exercises/:exercise_id' }
    ),
  ]),
];

export const router = createHashRouter(routes.getRoutes());
