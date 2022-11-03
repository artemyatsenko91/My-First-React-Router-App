import styles from './style.module.css';
import { useDispatch } from 'react-redux';
import { toggleStatus, deleteTodo } from '../../../features/todoSlice';

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    return (
        <li className={styles['todo-item']}>
            <input
                type='checkbox'
                checked={completed}
                onChange={() => dispatch(toggleStatus(id))}
            />
            <span>{title}</span>
            <span
                className={styles['btn-delete']}
                onClick={() => dispatch(deleteTodo(id))}
            >
                &times;
            </span>
        </li>
    );
};

export default TodoItem;