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
                    <img src="https://placehold.jp/000000/ffffff/50x50.png?text=LOGO&css=%7B%22border-radius%22%3A%2260px%22%7D" alt="Логотип" />
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