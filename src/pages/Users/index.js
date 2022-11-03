import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UsersName from "../../components/User/UsersName";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchUserNames } from '../../features/userNamesSlice';
import LoadingStatus from '../../components/LoadingStatus';

const Users = () => {
    const dispatch = useDispatch();
    const dataNames = useSelector(state => state.userName.userNames);
    const { status, error } = useSelector(state => state.userName);

    useEffect(() => {
        dispatch(fetchUserNames());
    }, [dispatch]);

    return (
        <LoadingStatus status={status} error={error}>
            <>
                {dataNames?.map(item =>
                    <Link key={item.id} to={`/users/${item.id}/albums`}>
                        <UsersName
                            id={item.id}
                            title={item.name}
                            key={item.id}
                        />
                    </Link>
                )}
            </>
        </LoadingStatus>
    );
}

export default Users;