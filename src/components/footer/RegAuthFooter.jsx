import { NavLink } from 'react-router-dom';
import './regAuthFooter.css'


const RegAuthFooter = ({ textColor, bgColor }) => {
    return (<>
        <div className='auth__footer' style={{ backgroundColor: bgColor }}>
            <div className='container'>
                <div className='auth__footer-inner'>
                    <div className='auth__footer-navigation'>
                        <NavLink to='/events'>
                            <img src={require('./img/logo.png')} alt="Логотип" />
                        </NavLink>
                        <nav>
                            <ul className='auth__footer-menu'>
                                <li>
                                    <NavLink to="/events" style={{ color: textColor }}>Мероприятия</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/resale" style={{ color: textColor }}>Барахолка</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='auth__footer-links'>
                        <a className='auth__footer-link' href='#'>
                            <img src={require('./img/twitter_icon.png')} alt="" />
                        </a>
                        <a className='auth__footer-link' href='#'>
                            <img src={require('./img/facebook_icon.png')} alt="" />
                        </a>
                        <a className='auth__footer-link' href='#'>
                            <img src={require('./img/instagram_icon.png')} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default RegAuthFooter;