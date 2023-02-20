import './header.css';


const Header = () => {

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner'>
                    <img src="https://imgholder.ru/50x50/8493a8/adb9ca&text=logo&font=kelson" alt="Логотип"/>
                    <nav>
                        <ul className='menu'>
                            <li>Мероприятия</li>
                            <li>Барахолка</li>
                        </ul>
                    </nav>
                    <button className='auth__btn'>Войти</button>
                </div>
            </div>
        </header>
    )
}

export default Header;