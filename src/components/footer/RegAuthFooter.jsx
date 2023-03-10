import { NavLink } from 'react-router-dom';


const RegAuthFooter = () => {
    return (<>
        <div className='auth__footer'>
            <div className='auth__footer-inner'>
                <div className='auth__footer-navigation'>
                    <img src="https://placehold.jp/000000/ffffff/50x50.png?text=LOGO&css=%7B%22border-radius%22%3A%2260px%22%7D" alt="Логотип" />
                    <nav>
                        <ul className='auth__footer-menu'>
                            <li>
                                <NavLink to="/events">Мероприятия</NavLink>
                            </li>
                            <li>
                                <NavLink to="/resale">Барахолка</NavLink>
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
    </>)
}

export default RegAuthFooter;