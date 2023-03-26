import { NavLink } from 'react-router-dom';
import './eventCard.scss'

const EventCard = ({ id, name, event_image_path, date }) => {

    let photoURL = ''
    if (event_image_path === null) {
        photoURL = `${process.env.REACT_SERVER_URL}event_image/standard.png`
    } else {
        photoURL = `${process.env.REACT_APP_SERVER_URL}/${event_image_path}`;
    }

    return (
        <>
        <NavLink to={String(id)}>
            <div className="card">
                <div className="card__photo">
                    <img src={photoURL} alt='Фото мероприятия'/>
                </div>
                <div className='card-date'>
                    {date}
                </div>
                <div className="card-name">
                    {name}
                </div>
            </div>
        </NavLink>
        </>
    )
}

export default EventCard;