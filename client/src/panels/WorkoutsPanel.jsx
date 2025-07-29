import { uid } from 'uid';
import {
    Panel,
    CardGrid,
    PanelHeader,
    PanelHeaderBack,
    Header
} from '@vkontakte/vkui';
import WorkoutCard from '../components/workoutCard/WorkoutCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getThunkWorkouts } from '../store/redux/thunks/getThunkWorkouts';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const WorkoutsPanel = ({ id }) => {
    const dispatch = useDispatch();
    const routeNavigator = useRouteNavigator();
/*
    useEffect(() => {
        dispatch(getThunkWorkouts());
    }, [dispatch]);
*/
    const workouts = useSelector(state => state.main?.workouts);

    return (
        <Panel id={id}>
            <Header before={<PanelHeaderBack onClick={() => routeNavigator.push("/")} />}>
                Тренировки
            </Header>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
                padding: '16px',
            }}
            >
                {workouts && workouts.length > 0 ? (
                workouts.map(workout => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))
                ) : (
                <div>У вас пока нет ни одной тренировки(</div>
                )}
            </div>
        </Panel>
    );
};

export default WorkoutsPanel;