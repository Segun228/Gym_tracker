import {
    Card,
    Group,
    Title,
    Text,
    Button,
    Spacing,
    Separator,
} from '@vkontakte/vkui';
import countExercisesPerformed from '../../helpers/countExercisesPerformed';
import countSetsPerformed from '../../helpers/countSetsPerformed';
import countCalloriesBurnt from '../../helpers/countCalloriesBurnt';

const WorkoutCard = ({ workout, onOpen }) => {
    return (
        <Card 
            mode="shadow" 
            style={{
                padding: 16,
                width: '100%',
                maxWidth: 280,
                margin: '0 auto',
            }}
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

            <Button mode="tertiary" onClick={onOpen}>Изменить</Button>
        </Group>
        </Card>
    );
};

export default WorkoutCard;