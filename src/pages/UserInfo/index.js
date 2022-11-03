import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchUser } from "../../features/userInfoSlice";
import LoadingStatus from '../../components/LoadingStatus';
import UserInfoHeader from "../../components/User/UserInfoHeader";
import TabsBlock from "../../components/TabsBlock";

const UserInfo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.userInfo);
    const [loadingStatus, setLoadingStatus] = useState([]);

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    useEffect(() => {
        setLoadingStatus(status);
    }, [status]);

    return (
        <>
            <LoadingStatus
                status={loadingStatus}
                error={error}>
                <>
                    <UserInfoHeader />
                    <TabsBlock />
                </>
            </LoadingStatus>
        </>
    )
}

export { UserInfo };