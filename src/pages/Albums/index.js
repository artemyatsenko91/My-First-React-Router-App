import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAlbums } from '../../features/albumSlice';
import UserAlbums from '../../components/Albums';
import LoadingStatus from '../../components/LoadingStatus';

function Albums() {
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.album);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch])

    return (
        <div className="albums">
            <LoadingStatus status={status} error={error}>
                <UserAlbums />
            </LoadingStatus>
        </div>
    );
}

export default Albums;