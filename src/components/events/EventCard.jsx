import { NavLink } from 'react-router-dom';
import './eventCard.css'

const EventCard = ({ id, name, event_image_path, date }) => {

    let photoURL = ''
    if (event_image_path === null) {
        photoURL = `https://snowboard.na4u.ru/event_image/standard.png`
    } else {
        photoURL = `https://snowboard.na4u.ru/${event_image_path}`;
    }

    console.log(photoURL)
    console.log(event_image_path)

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