import React, { useState, useCallback } from 'react';
import { ModalPage, ModalPageHeader, PanelHeaderButton, Group, FormLayoutGroup, Input, Textarea, Button } from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
const WorkoutCreateModal = ({ id, onModalClose, onCreateWorkout }) => {
    const routerNavigator = useRouteNavigator()
    const closeModal = ()=>{
        routerNavigator.closeModal()
    }
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = useCallback(() => {
        if (!title.trim()) {
            alert('Введите название тренировки');
            return;
        }

        if (onCreateWorkout) {
            onCreateWorkout({ title, description });
        }

        closeModal();
    }, [title, description, onCreateWorkout, closeModal]);


    if (!closeModal) {
        console.error("WorkoutCreateModal: closeModal function is not available. Ensure `useModalContext` is used within RouterProvider or `onModalClose` prop is provided.");
        return null;
    }

    return (
        <ModalPage
            id={id}
            header={
                <ModalPageHeader
                    before={
                        <PanelHeaderButton onClick={closeModal}>
                            <Icon24Cancel />
                        </PanelHeaderButton>
                    }
                >
                    Новая тренировка
                </ModalPageHeader>
            }

        >
            <Group>
                <FormLayoutGroup mode="vertical">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Название тренировки"
                        required
                    />
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Описание (необязательно)"
                    />
                    <Button size="l" stretched onClick={handleSubmit}>
                        Создать
                    </Button>
                </FormLayoutGroup>
            </Group>
        </ModalPage>
    );
};

export default WorkoutCreateModal;