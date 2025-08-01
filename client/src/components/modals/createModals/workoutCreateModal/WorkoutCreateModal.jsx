import React, { useState, useCallback } from 'react';
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

const WorkoutCreateModal = ({ id, onCreateWorkout }) => {
    const routerNavigator = useRouteNavigator();

    const closeModal = () => {
        routerNavigator.back()
    };

    const [note, setNote] = useState('');


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
            Новая тренировка
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
                Создать тренировку
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        </ModalPage>
    );
};

export default WorkoutCreateModal;