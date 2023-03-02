import { useEffect } from 'react';
import './eventCard.css'

const EventCard = ({ name, text, event_image_path }) => {

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
                <button className='card__open-btn'>Открыть</button>
            </div>
        </>
    )
}

export default EventCard;