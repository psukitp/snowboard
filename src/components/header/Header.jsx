import { useSelector } from 'react-redux';
import './header.css';
import Toolbar from './Toolbar';


const Header = () => {
    const userStatus = useSelector((store) => store.user)
    const isLog = userStatus.isAuth;


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
                    {isLog ? <Toolbar name={userStatus.name} /> :
                        <a href="/auth"><button className='auth__btn'>Войти</button></a>}
                </div>
            </div>
        </header>
    )
}

export default Header;