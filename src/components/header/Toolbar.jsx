import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { userApi } from '../../api/userApi'
import './toolbar.scss'

const Toolbar = (props) => {

    const dispatch = useDispatch()

    const showDropdown = (e) => {
        const dropdown = document.querySelector('.dropdown');
        const dropdown_wrapper = document.querySelector('.dropdown__wrapper');
        dropdown.classList.toggle('active');
        dropdown_wrapper.classList.toggle('active');
    }

    const handleLogout = () => {
        dispatch(userApi.logout())
    }

    return (
        <>
            <div className="dropdown__wrapper" onClick={showDropdown}>
                <div className='dropdown__toolbar'>
                    <div className='dropdown__name'>
                        {props.name}
                        <img src={props.photoUrl} alt='Аватарка' />
                    </div>
                    <img src={require('./img/toolbar_dropdown.png')} alt="" />
                </div>
                <ul className="dropdown">
                    <NavLink to='/profile'>
                        <li>
                            Настройки
                            <img src={require('./img/toolbar_settings.png')} alt="" />
                        </li>
                    </NavLink>
                    <NavLink to='/my-events'>
                        <li>Мои мероприятия</li>
                    </NavLink>
                    <NavLink to='/my-resales'>
                        <li>Мои объявления</li>
                    </NavLink>
                    <NavLink to='/events'>
                        <li onClick={handleLogout}>Выйти <img src={require('./img/toolbar_quit.png')} alt="" /></li>
                    </NavLink>
                </ul>
            </div>
        </>
    )
}

export default Toolbar;