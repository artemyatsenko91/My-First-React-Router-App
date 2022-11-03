import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from '../../features/todoSlice';
import { useParams } from 'react-router-dom';
import TodoForm from '../../components/Todos/TodoForm';
import TodoList from '../../components/Todos/TodoList';
import LoadingStatus from '../../components/LoadingStatus';

function Todos() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.todo);
    const { id } = useParams();

    const handleAction = () => {
        if (text.trim().length) {
            dispatch(addNewTodo({ text, id }));
            setText('');
        }
    }

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch])

    return (
        <div className='todos'>
            <TodoForm
                value={text}
                updateText={setText}
                handleAction={handleAction}
            />
            <LoadingStatus status={status} error={error}>
                <TodoList />
            </LoadingStatus>
        </div>
    );
}

export default Todos;