import classes from './style.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const TabsBlock = () => {
    return (
        <div className={classes['tabs-wrapper']}>
            <ul className={classes['tabs-block']}>
                <li><NavLink to="albums">Albums</NavLink></li>
                <li><NavLink to="todos">Todos</NavLink></li>
                <li><NavLink to="posts">Posts</NavLink></li>
            </ul>
            <Outlet />
        </div>
    )
}

export default TabsBlock;