import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
    Card,
    Group,
    Title,
    Text,
    Button,
    Spacing,
    Separator,
    Caption
} from '@vkontakte/vkui';

const ExerciseCard = ({ workout_id, exercise, onOpen }) => {
    const routerNavigator = useRouteNavigator()
    return (
        <Card 
            mode="shadow" 
            style={{
                padding: 16,
                width: '100%',
                maxWidth: 280,
                margin: '0 auto',
                cursor: "pointer"
            }}
            onClick={()=>{routerNavigator.push(`/workouts/${workout_id}/exercises/${exercise?.id}`)}}
        >
        <Group mode="plain" style={{ padding: 0 }}>
            <Title level="3" weight="2" style={{ marginBottom: 8 }}>
            {exercise?.template?.name || "Упражнение"}
            </Title>

            <Spacing size={12} />
            <Text>Мышечная группа: {exercise?.template?.muscle_group}</Text>
            <Spacing size={8} />
            <Caption>{"Сделано подходов "}{exercise?.sets.length || 0}</Caption>
            <Spacing size={12} />

            <Separator wide />
            <Spacing size={12} />
            <div
                style={{
                    width:"100%",
                    display:"flex",
                    gap:20,
                    flexWrap:"wrap"
                }}
            >
                <Button mode="tertiary" onClick={onOpen}>Изменить</Button>
                <Button mode="tertiary" onClick={onOpen}>Удалить</Button>
            </div>
        </Group>
        </Card>
    );
};

export default ExerciseCard;