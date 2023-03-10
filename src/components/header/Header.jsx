import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './header.css';
import Toolbar from './Toolbar';


const Header = (props) => {
    const userStatus = useSelector((store) => store.user)
    const isLog = userStatus.isAuth;


    return (
        <header className='header' style={{ backgroundColor: props.background }}>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__inner-navigation'>
                        <img src="https://placehold.jp/000000/ffffff/50x50.png?text=LOGO&css=%7B%22border-radius%22%3A%2260px%22%7D" alt="Логотип" />
                        <nav>
                            <ul className='menu'>
                                <li>
                                    <NavLink to="/events" style={{ color: props.color }}> Мероприятия</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/resale" style={{ color: props.color }}>Барахолка</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {isLog ? <Toolbar name={userStatus.name} /> :
                        <a href="/auth"><button className='auth__btn'>Войти</button></a>}
                </div>
            </div>
        </header >
    )
}

export default Header;