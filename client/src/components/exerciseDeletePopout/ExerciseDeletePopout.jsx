import { useState } from 'react';
import { 
    Alert,
    Button
} from '@vkontakte/vkui';
import { usePopout } from '@vkontakte/vk-mini-apps-router';
const ExerciseDeletePopout = ({ workout_id, exercise_id, onDelete }) => {
    const [popout, setPopout] = useState(null)
    const handleDelete = () => {
        setPopout(
            <Alert
            dismissLabel="Отмена"
            actions={[
                { title: 'Отмена',autoclose: true, mode: 'cancel',  },
                {title: 'Удалить', autoclose: true, mode: 'destructive',
                action: () => {
                    onDelete(workout_id)
                },}
            ]}
            title="Удаление упражнения"
            description="Вы уверены, что хотите удалить это упражнение?"
            />
        );
    };

    return (
        <>
        {popout}
        <Button size='l' onClick={()=>{handleDelete()}}>
            Удалить
        </Button>
        </>
    );
};

export default ExerciseDeletePopout