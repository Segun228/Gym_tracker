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

const TemplateCreateModal = ({ id, onCreateWorkout }) => {
    const routerNavigator = useRouteNavigator();

    const closeModal = () => {
        routerNavigator.push("/exercises")
    };

    const [name, setName] = useState('');
    const [muscle_group, setMuscleGroup] = useState('');


    const handleSubmit = useCallback(() => {
        if (!name.trim()) {
        alert('Введите название шаблона упражнения');
        return;
        }
        // TODO: Здесь должна быть логика обновления
        if (onCreateWorkout) {
        onCreateWorkout({ name, muscle_group });
        }

        closeModal();
    }, [name, muscle_group, onCreateWorkout, closeModal]);

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
            Новый шаблон упражнения
            </ModalPageHeader>
        }
        >
        <Group>
            <Spacing size={24} />
            <FormItem top="Название шаблона" bottom="Обязательно">
            <Textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например жим лежа, или присяд"
            />
            </FormItem>

            <Spacing size={24} />
            <FormItem top="Название мышечной группы" >
            <Textarea
                value={muscle_group}
                onChange={(e) => setMuscleGroup(e.target.value)}
                placeholder="Бипсепс, трипсепс, трицепатопс"
            />
            </FormItem>

            <Spacing size={24} />
            <FormItem>
            <Button size="l" stretched onClick={handleSubmit} appearance="accent">
                Создать шаблон
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        </ModalPage>
    );
};

export default TemplateCreateModal;
