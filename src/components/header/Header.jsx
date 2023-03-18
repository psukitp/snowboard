import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './header.css';
import Toolbar from './Toolbar';


const Header = ({ textColor, bgColor }) => {
    const userStatus = useSelector((store) => store.user)
    const isLog = userStatus.isAuth;
    const { user_image_path } = userStatus;


    let photoURL = ''
    if (user_image_path === null) {
        photoURL = `http://localhost:3001/user_image/standard.png`
    } else {
        photoURL = `http://localhost:3001/${user_image_path}`;
    }


    return (
        <header className='header' style={{ backgroundColor: bgColor }}>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__inner-navigation'>
                        <NavLink to='/events'>
                            <img src={require('./img/logo.png')} alt="Логотип" />
                        </NavLink>
                        <nav>
                            <ul className='menu'>
                                <li>
                                    <NavLink to="/events" style={{ color: textColor }}> Мероприятия</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/resale" style={{ color: textColor }}>Барахолка</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {isLog ? <Toolbar name={userStatus.login} sname={userStatus.s_name} photoUrl={photoURL} /> :
                        <a href="/auth"><button className='auth__btn'>Войти</button></a>}
                </div>
            </div>
        </header >
    )
}

export default Header;