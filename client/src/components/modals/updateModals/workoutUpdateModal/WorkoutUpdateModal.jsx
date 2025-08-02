import React, { useState, useCallback, useEffect } from 'react';
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
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useSelector } from 'react-redux';

const WorkoutUpdateModal = ({ id, onCreateWorkout }) => {
    const routerNavigator = useRouteNavigator();
    const params = useParams()
    const workout_id = params?.updating_workout_id
    const workout = useSelector(state => state?.main?.workouts?.find(workout => workout?.id == workout_id))
    const closeModal = () => {
        routerNavigator.back()
    };

    const [note, setNote] = useState(workout?.note || "");


    const handleSubmit = useCallback(() => {
        if (!note.trim()) {
        alert('Введите название тренировки');
        return;
        }
        // TODO: Здесь должна быть логика обновления
        if (onCreateWorkout) {
        onCreateWorkout({ note });
        }

        closeModal();
    }, [note, onCreateWorkout, closeModal]);

    useEffect(() => {
        if (workout_id) {
            setNote(String(workout?.note || ''));
        }
    }, [workout_id]);

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
            Изменение тренировки
            </ModalPageHeader>
        }
        >
        <Group>
            <Spacing size={24} />
            <FormItem top="Название тренировки" bottom="Обязательно">
            <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Например спина, кардио, или не дай бог день ног"
            />
            </FormItem>

            <Spacing size={24} />

            <FormItem>
            <Button size="l" stretched onClick={handleSubmit} appearance="accent">
                Изменить тренировку
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        </ModalPage>
    );
};

export default WorkoutUpdateModal;