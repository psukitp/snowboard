import { useDispatch } from 'react-redux'
import { api } from '../../api/api'
import './toolbar.css'

const Toolbar = (props) => {

    const dispatch = useDispatch()

    const showDropdown = (e) =>{
        const dropdown = document.querySelector('.dropdown');
        dropdown.classList.toggle('active');
    }

    const handleLogout = () =>{
        dispatch(api.logout())
    }

    return(
        <>
        <div className="dropdown__wrapper" onClick={showDropdown}>
            <div className='dropdown__name'>{props.name} ↓</div>
            <ul className="dropdown">
                <li>Профиль</li>
                <li onClick={handleLogout}>Выйти</li>
            </ul>
        </div>
        </>
    )
} 

export default Toolbar;