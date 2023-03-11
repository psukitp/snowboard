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
                        <NavLink to='/events'>
                            <img src={require('./img/logo.png')} alt="Логотип" />
                        </NavLink>
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
                    {isLog ? <Toolbar name={userStatus.name} sname={userStatus.s_name} /> :
                        <a href="/auth"><button className='auth__btn'>Войти</button></a>}
                </div>
            </div>
        </header >
    )
}

export default Header;