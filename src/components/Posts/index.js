import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import PostItem from './PostItem';

const Posts = () => {
    const { posts } = useSelector(state => state.post);
    const { id } = useParams();
    return (
        <div className={styles['posts-container']}>
            {posts
                ?.filter(todo => todo.userId === +id)
                .map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                    />
                ))}
        </div>
    )
}

export default Posts