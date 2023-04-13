import './eventCard.scss'
import { userUtils } from '../../utils/user.utils';

const EventCard = ({ id, name, event_image_path, date }) => {

    const photoURL = userUtils.getPhotoURL(event_image_path, 'event_image')

    return (
        <>
            {/* <NavLink to={String(id)}> */}
            <div className="card">
                <div className="card__photo">
                    <img src={photoURL} alt='Фото мероприятия' />
                </div>
                <div className='card-date'>
                    {date}
                </div>
                <div className="card-name">
                    {name}
                </div>
            </div>
            {/* </NavLink> */}
        </>
    )
}

export default EventCard;