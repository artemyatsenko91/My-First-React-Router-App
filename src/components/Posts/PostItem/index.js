import styles from './style.module.css'
import { useDispatch } from 'react-redux/es/exports'
import { deletePosts } from '../../../features/postSlice'

const PostItem = ({ post }) => {
    const dispatch = useDispatch();

    return (
        <div className={styles['post-item']}>
            <div className={styles.content}>
                <h2>Title: {post.title}</h2>
                <p>Body: {post.body}</p>
            </div>
            <button
                onClick={() => dispatch(deletePosts(post.id))}
                className={styles.btn}
            >
                &times;
            </button>
        </div>
    )
}

export default PostItem
