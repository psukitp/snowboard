import { NavLink } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer__inner">
                        <NavLink to='/events'>
                            <img src={require('./img/logo.png')} alt="Логотип" />
                        </NavLink>
                        <p className='text'>Сноубординг</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;