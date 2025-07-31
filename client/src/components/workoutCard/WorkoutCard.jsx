import {
    Card,
    Group,
    Title,
    Text,
    Button,
    Spacing,
    Separator,
    ButtonGroup,
} from '@vkontakte/vkui';
import countExercisesPerformed from '../../helpers/countExercisesPerformed';
import countSetsPerformed from '../../helpers/countSetsPerformed';
import countCalloriesBurnt from '../../helpers/countCalloriesBurnt';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import WorkoutDeletePopout from '../workoutDeletePopout/WorkoutDeletePopout';
import { deleteWorkout as asyncDeleteWorkout } from '../../api/requests/workouts/workoutsRequest';
import { deleteWorkout } from '../../store/redux/mainSlice';
const WorkoutCard = ({ workout, onOpen }) => {
    const workout_id = workout?.id
    const handleDelete = async () => {
        dispatch(deleteWorkout(workout_id))
        await asyncDeleteWorkout(workout_id)
    }
    const routerNavigator = useRouteNavigator()
    return (
        <Card 
            mode="shadow" 
            style={{
                padding: 16,
                width: '100%',
                maxWidth: 280,
                margin: '0 auto',
                cursor:"pointer"
            }}
            onClick={()=>{routerNavigator.push(`/workouts/${workout?.id}`)}}
        >
        <Group mode="plain" style={{ padding: 0 }}>
            <div style={{ marginBottom: 12 }}>
            <Text style={{ color: 'gray' }}>{workout?.date || "недавно"}</Text>
            </div>

            <Title level="3" weight="2" style={{ marginBottom: 8 }}>
            {workout?.note || "Тренировка"}
            </Title>

            <Spacing size={12} />
            <Text>Упражнений выполнено: {countExercisesPerformed(workout) || 0}</Text>
            <Spacing size={8} />
            <Text>Подходов выполнено: {countSetsPerformed(workout) || 0}</Text>
            <Spacing size={8} />
            <Text>Калорий сожжено: {countCalloriesBurnt(workout) || 0}</Text>

            <Spacing size={16} />
            <Separator wide="true" />
            <Spacing size={12} />
            <div
                style={{
                    width:"100%",
                    display:"flex",
                    gap:20,
                    flexWrap:"wrap"
                }}
            >
                <ButtonGroup onClick={(e)=>{e.stopPropagation()}}>
                    <Button size="l" onClick={onOpen}>Изменить</Button>
                    <WorkoutDeletePopout mode="secondary" workout_id={workout?.id} onDelete={()=>{handleDelete(workout_id)}}/>
                </ButtonGroup>
            </div>
        </Group>
        </Card>
    );
};

export default WorkoutCard;