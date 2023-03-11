import { useDispatch } from 'react-redux'
import { api } from '../../api/api'
import './toolbar.css'

const Toolbar = (props) => {

    const dispatch = useDispatch()

    const showDropdown = (e) => {
        const dropdown = document.querySelector('.dropdown');
        const dropdown_wrapper = document.querySelector('.dropdown__wrapper');
        dropdown.classList.toggle('active');
        dropdown_wrapper.classList.toggle('active');
    }

    const handleLogout = () => {
        dispatch(api.logout())
    }

    return (
        <>
            <div className="dropdown__wrapper" onClick={showDropdown}>
                <div className='dropdown__toolbar'>
                    <div className='dropdown__name'>
                        {props.name} {props.sname}
                    </div>
                    <img src={require('./img/toolbar_dropdown.png')} alt="" />
                </div>
                <ul className="dropdown">
                    <li>Настройки<img src={require('./img/toolbar_settings.png')} alt="" /></li>
                    <li onClick={handleLogout}>Выйти <img src={require('./img/toolbar_quit.png')} alt="" /></li>
                </ul>
            </div>
        </>
    )
}

export default Toolbar;