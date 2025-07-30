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

const TemplateCard = ({ template, onOpen }) => {
    const date = new Date(template?.created_at);
    const formatted = date.toLocaleDateString('ru-RU');
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
            <Title level="3" weight="2" style={{ marginBottom: 8 }}>
            {template?.name || "Упражнение"}
            </Title>

            <Spacing size={12} />
            <Text>Мышечная группа: {template?.muscle_group}</Text>
            <Spacing size={8} />
            <Caption>{"Cоздано "}{formatted || "Недавно"}</Caption>
            <Spacing size={12} />

            <Separator wide />
            <Spacing size={12} />

            <Button mode="tertiary" onClick={onOpen}>Изменить</Button>
        </Group>
        </Card>
    );
};

export default TemplateCard;