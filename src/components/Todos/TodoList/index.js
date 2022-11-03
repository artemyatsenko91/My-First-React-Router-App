import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TodoItem from '../TodoItem';
import styles from './style.module.css';

const TodoList = () => {
    const todos = useSelector(state => state.todo.todos);
    const { id } = useParams();
    return (
        <ul className={styles['todos-item']}>
            {todos
                ?.filter(todo => todo.userId === +id)
                .map((todo) => (
                    <TodoItem key={todo.id} {...todo} />
                ))}
        </ul>
    );
};

export default TodoList;