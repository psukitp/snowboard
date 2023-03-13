import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './eventCard.css'

const EventCard = ({ id, name, text, event_image_path, date }) => {

    let photoURL = ''
    if (event_image_path === null) {
        photoURL = `http://localhost:3001/event_image/standard.jpeg`
    } else {
        photoURL = `http://localhost:3001/${event_image_path}`;
    }
    return (
        <><NavLink to={String(id)}>
            <div className="card">
                <div className="card__photo">
                    <img src={photoURL} />
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