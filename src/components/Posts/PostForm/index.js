import styles from './style.module.css';
import { useDispatch } from "react-redux/es/exports";
import { addPostByUser } from '../../../features/postSlice';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';

const PostsForm = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        const post = {
            id: Math.random() * 155,
            title: data.title,
            body: data.body,
            userId: +id,
        }

        if (data.title && data.body) {
            dispatch(addPostByUser(post));
        }
        reset();
    }
    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.input}>
                Title
                <input
                    {...register('title', {
                        required: 'Please, enter a title',
                    })}
                    placeholder='Type title...'
                />
            </label>
            <div>{errors?.title && <span className={styles.error}>{errors?.title?.message || 'Error'}</span>}</div>
            <label className={styles.input}>
                Body
                <input
                    {...register('body', {
                        required: 'Please, enter a body',
                    })}
                    placeholder='Type body...'
                />
            </label>
            <div>
                {errors?.body &&
                    <span className={styles.error}>
                        {errors?.body?.message || 'Error'}
                    </span>
                }
            </div>
            <input type='submit' className={styles.btn}/>
        </form>
    )
}

export default PostsForm;
