import {
    Panel,
    Header,
    PanelHeaderBack,
    FixedLayout,
    Div,
    Button,
    Flex,
    ButtonGroup
} from '@vkontakte/vkui';
import SetCard from '../components/setCard/SetCard';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useSelector } from 'react-redux';
const WorkoutExercisePanel = ({id}) => {
    const routerNavigator = useRouteNavigator()
    const params = useParams()
    const {workout_id, exercise_id} = params
    const workout = useSelector(state => state.main?.workouts.find(workout => workout?.id == workout_id))
    const exercise = workout?.workout_exercises.find(exercise => exercise?.id == exercise_id)
    const sets = exercise?.sets
    return ( 
        <Panel id={id} style={{paddingBottom:80}}>
            <Header onClick={() => routerNavigator.back()} before={<PanelHeaderBack />}>
                {exercise?.template?.name}
            </Header>
            <Flex
                direction='column'
                align='center'
                style={{
                    gap: '20px',
                    padding: '20px',
                    paddingInline: 30,
                    paddingRight: 30
                }}
            >
                {sets && sets.length > 0 ? (
                sets.map(set => (
                    <SetCard key={workout.id} set={set}/>
                ))
                ) : (
                <div>У вас пока нет ни одного подхода(</div>
                )}
            </Flex>
            <FixedLayout filled vertical="bottom" >
                <ButtonGroup stretched={true}>
                    <Button stretched size='l'>Добавить выполненный подход</Button>
                    <Button size='l'>Удалить</Button>
                </ButtonGroup>
            </FixedLayout>
        </Panel>
    );
}

export default WorkoutExercisePanel;