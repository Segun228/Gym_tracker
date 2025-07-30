import { uid } from 'uid';
import {
    Panel,
    CardGrid,
    PanelHeader,
    PanelHeaderBack,
    Header,
    Button,
    Div,
    FixedLayout
} from '@vkontakte/vkui';
import WorkoutCard from '../components/workoutCard/WorkoutCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getThunkWorkouts } from '../store/redux/thunks/getThunkWorkouts';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import TemplateCard from '../components/templateCard/TemplateCard';
import { getThunkTemplates } from '../store/redux/thunks/getThunkTemplates';

const ExercisesPanel = ({ id }) => {
    const dispatch = useDispatch();
    const routeNavigator = useRouteNavigator();
/*
    useEffect(() => {
        dispatch(getThunkTemplates());
    }, [dispatch]);
*/
    const templates = useSelector(state => state.main?.templates);

    return (
        <Panel id={id} style={{paddingBottom:80}}>
            <Header before={<PanelHeaderBack onClick={() => routeNavigator.push("/")} style={{cursor:"pointer"}}/>}>
                Мои упражнения
            </Header>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
                padding: '16px',
                paddingInline: 30
            }}
            >
                {templates && templates.length > 0 ? (
                templates.map(template => (
                    <TemplateCard key={template.id} template={template} />
                ))
                ) : (
                <div>У вас пока нет ни одного упражнения(</div>
                )}
            </div>
            <FixedLayout filled vertical="bottom">
                <Div>
                    <Button size="l" stretched>Добавить упражнение</Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};

export default ExercisesPanel;
