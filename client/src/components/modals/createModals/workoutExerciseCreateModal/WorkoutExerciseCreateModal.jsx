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
import SelectList from '../../../atoms/SelectList';

const WorkoutExerciseCreateModal = ({ id, onCreateSet }) => {
    const routerNavigator = useRouteNavigator();

    const closeModal = () => {
        routerNavigator.push("/workout")
    }

    const [template, setTemplate] = useState("")


    const handleSubmit = useCallback(() => {
        if (!template.trim()) {
        alert('Заполните необходимые поля');
        return;
        }

        if (onCreateSet) {
        onCreateSet({ template });
        }

        closeModal();
    }, [template, onCreateSet, closeModal]);

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
            Новое упражнение
            </ModalPageHeader>
        }
        >
        <Group>
            <Spacing size={24} />
            <FormItem top="Рабочий вес" >
                <Input
                    value={template}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <SelectList setTemplate={setTemplate} template={template}/>
            </FormItem>
            <Spacing size={20} />
            <Button size="l" stretched onClick={()=>routerNavigator.push("/exercises/modal")} appearance="accent">
                Новое упражнение
            </Button>
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

export default WorkoutExerciseCreateModal;