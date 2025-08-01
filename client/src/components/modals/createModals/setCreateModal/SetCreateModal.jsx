import { useState, useCallback } from 'react';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    FormItem,
    Input,
    Textarea,
    Button,
    Spacing,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const SetCreateModal = ({ id, onCreateSet }) => {
    const routerNavigator = useRouteNavigator();

    const closeModal = () => {
        routerNavigator.push("/exercises")
    };

    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const [duration, setDuration] = useState('00:00:00')

    const handleSubmit = useCallback(() => {
        if (!note.trim()) {
        alert('Заполните необходимые поля');
        return;
        }
        // TODO: Здесь должна быть логика обновления
        if (onCreateSet) {
        onCreateSet({ note });
        }

        closeModal();
    }, [weight, reps, duration, onCreateSet, closeModal]);

    return (
        <ModalPage
        id={id}
        settlingHeight={80}
        dynamicContentHeight
        header={
            <ModalPageHeader
            before={
                <PanelHeaderButton onClick={()=>closeModal()}>
                <Icon24Cancel />
                </PanelHeaderButton>
            }
            >
            Новый подход
            </ModalPageHeader>
        }
        >
        <Group>
            <Spacing size={24} />
            <FormItem top="Рабочий вес" >
                <Input
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="С каким весом делал?"
                />
            </FormItem>
            <Spacing size={20} />
            <FormItem top="Количество повторений">
                <Input
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="Сколько раз ты пожал свои 30?"
                />
            </FormItem>
            <Spacing size={20} />
            <FormItem top="Время выполнения" >
                <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    type='time'
                />
            </FormItem>
            <Spacing size={20} />
            <FormItem>
            <Button size="l" stretched onClick={handleSubmit} appearance="accent">
                Добавить подход
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        </ModalPage>
    );
};

export default SetCreateModal;