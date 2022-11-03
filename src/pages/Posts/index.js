import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPosts } from '../../features/postSlice';
import Posts from '../../components/Posts';
import PostForm from '../../components/Posts/PostForm';
import LoadingStatus from '../../components/LoadingStatus';

function UserPosts() {
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch])

    return (
        <div className="posts">
            <PostForm />
            <LoadingStatus status={status} error={error}>
                <Posts />
            </LoadingStatus>
        </div>
    );
}

export default UserPosts;