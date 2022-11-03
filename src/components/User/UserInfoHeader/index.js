import styles from './style.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux/es/exports';

const UserInfoHeader = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const userInfo = useSelector(state => state.userInfo.userInfo);

    return (
        <>
            <button onClick={goBack}>Back</button>
            <div className={styles['user-card']}>
                {userInfo
                    ? (
                        <>
                            <h1 className={styles['user-title']}><span className={styles.bold}>{userInfo.name}</span></h1>
                            <div className={styles['user-information']}>
                                Username: <span className={styles.bold}>{userInfo.username}</span>
                            </div>
                            <div className={styles['user-information']}>
                                <FontAwesomeIcon icon={faEnvelope} />
                                Email: <span className={styles.bold}><a href={`mailto:${userInfo.email}`}>{userInfo.email}</a></span>
                            </div>
                            <div className={styles['user-information']}>
                                <FontAwesomeIcon icon={faMapLocation} />
                                <div className={styles.adress}>
                                    <span>Street: <span className={styles.bold}>{userInfo.address.street}</span></span>
                                    <span>city: <span className={styles.bold}>{userInfo.address.city}</span></span>
                                    <span>zipcode: <span className={styles.bold}>{userInfo.address.zipcode}</span></span>
                                </div>
                            </div>
                            <div className={styles['user-information']}>
                                <FontAwesomeIcon icon={faPhone} />
                                Phone: <span className={styles.bold}><a href={`tel:+${userInfo.phone}`}>{userInfo.phone}</a></span>
                            </div>
                            <div className={styles['user-information']}>
                                Website: <span className={styles.bold}>{userInfo.website}</span>
                            </div>
                            <div className={styles['user-information']}>
                                Company: <span className={styles.bold}>{userInfo.company.name}</span>
                            </div>
                        </>
                    )
                    : <div>No data!</div>}
            </div>
        </>
    )
}

export default UserInfoHeader;