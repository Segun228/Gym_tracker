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
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import SelectList from '../../../atoms/SelectList';

const WorkoutExerciseCreateModal = ({ id, onCreateWorkoutExercise }) => {
    const params = useParams()
    const workout_id = params?.workout_id
    const routerNavigator = useRouteNavigator();
    const closeModal = () => {
        if(workout_id){
            routerNavigator.push(`/workouts/${workout_id}`);
        }
        else{
            routerNavigator.push(`/workouts`);
        }
    };

    const [template, setTemplate] = useState("");

    const handleSubmit = useCallback(() => {
        if (!template?.trim()) {
            alert('Необходимо выбрать шаблон упражнения');
            return;
        }
        // TODO: Здесь должна быть логика обновления
        if (onCreateWorkoutExercise) {
            onCreateWorkoutExercise({ template });
        }

        closeModal();
    }, [template, onCreateWorkoutExercise, closeModal]);

    return (
        <ModalPage
            id={id}
            settlingHeight={80}
            dynamicContentHeight
            header={
                <ModalPageHeader
                    before={
                        <PanelHeaderButton onClick={closeModal}>
                            <Icon24Cancel />
                        </PanelHeaderButton>
                    }
                >
                    Новое упражнение
                </ModalPageHeader>
            }
        >
            <Group>
                <Spacing size={24} />
                {/* Компонент для выбора шаблона упражнения */}
                <FormItem top="Шаблон упражнения" >
                    <SelectList setTemplate={setTemplate} template={template}/>
                </FormItem>
                <Spacing size={20} />
                
                <FormItem>
                    <Button 
                        size="l" 
                        stretched 
                        onClick={() => routerNavigator.push("/exercises/modal")} 
                        appearance="accent"
                        mode='secondary'
                    >
                        Новый шаблон упражнения
                    </Button>
                </FormItem>
                <Spacing size={10} />
                
                <FormItem>
                    <Button 
                        size="l" 
                        stretched 
                        onClick={handleSubmit} 
                        appearance="accent"
                        disabled={!template.trim()} 
                    >
                        Добавить упражнение
                    </Button>
                </FormItem>
                <Spacing size={12} />
            </Group>
        </ModalPage>
    );
};

export default WorkoutExerciseCreateModal;