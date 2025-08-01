import React, { useState, useCallback, useEffect } from 'react';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    FormItem,
    Textarea,
    Button,
    Spacing,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useSelector } from 'react-redux';

const TemplateUpdateModal = ({ id, onUpdateTemplate }) => {
    const params = useParams()
    const template_id = params?.updating_template_id
    const initial_template = useSelector(state => state.main?.templates?.find(template => template?.id == template_id))
    const routerNavigator = useRouteNavigator();

    const closeModal = () => {
        routerNavigator.push("/exercises")
    };

    const [name, setName] = useState('');
    const [muscle_group, setMuscleGroup] = useState('');

    useEffect(() => {
        if (initial_template) {
            setName(initial_template.name || '');
            setMuscleGroup(initial_template.muscle_group || '');
        }
    }, [initial_template]);

    const handleSubmit = () => {
        if (!name.trim()) {
        alert('Введите название шаблона упражнения');
        return;
        }
        // TODO: Здесь должна быть логика обновления
        if (onUpdateTemplate) {
            onUpdateTemplate({ name, muscle_group });
        }

        closeModal();
    }

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
            Изменение шаблона упражнения
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
                Изменить шаблон
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        </ModalPage>
    );
};

export default TemplateUpdateModal;
