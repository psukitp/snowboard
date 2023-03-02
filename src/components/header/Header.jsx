import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './header.css';
import { useEffect } from 'react';
import { api } from '../../api/api';


const Header = () => {
    const dispatch = useDispatch()
    const userStatus = useSelector((store) => store.user)
    const isLog = userStatus.isAuth;
    console.log(isLog);
    console.log(userStatus.name);

    const handleLogout = () =>{
        dispatch(api.logout())
    }

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <img src="https://imgholder.ru/50x50/8493a8/adb9ca&text=logo&font=kelson" alt="Логотип" />
                    <nav>
                        <ul className='menu'>
                            <li>
                                <a href="/events">Мероприятия</a>
                            </li>
                            <li>
                                <a href="/sale">Барахолка</a>
                            </li>
                        </ul>
                    </nav>
                    {isLog ? userStatus.name: <button className='auth__btn'>Войти</button>}
                    {isLog ?<button onClick={handleLogout}>Выйти</button>: null}
                </div>
            </div>
        </header>
    )
}

export default Header;