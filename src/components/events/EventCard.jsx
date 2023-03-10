import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './eventCard.css'

const EventCard = ({ id, name, text, event_image_path }) => {

    let photoURL = ''
    if (event_image_path === null) {
        photoURL = `http://localhost:3001/event_image/standard.jpeg`
    } else {
        photoURL = `http://localhost:3001/${event_image_path}`;
    }
    return (
        <>
            <div className="card">
                <div className="card-name">
                    {name}
                </div>
                <div className="card__photo">
                    <img src={photoURL} />
                </div>
                <div className="card-descr">
                    {text.length > 140 ? text.slice(0, 137) + "..." : text}
                </div>
                <NavLink to={String(id)}>
                    <button className='card__open-btn'>Открыть</button>
                </NavLink>
            </div>
        </>
    )
}

export default EventCard;