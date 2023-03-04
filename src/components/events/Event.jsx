import './event.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import { useParams } from 'react-router';



const Event = () => {
    const {id} = useParams();
    console.log(id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(api.getOneEvent(id));
    }, [])
    const event = useSelector((store) => store.currentEvent);

    let photoURL = ''
    if (event.event_image_path === null) {
        photoURL = `http://localhost:3001/event_image/standard.jpeg`
    } else {
        photoURL = `http://localhost:3001/${event.event_image_path}`;
    }

    return (
        <>
            <div className="event">
                <div className="container">
                    <div className="event__inner">
                        <div className="event__inner-creator">
                            <div className="event__inner-author">
                                {event.creator_id}
                            </div>
                            <div className="event__inner-date">
                                {event.event_date === null ? '01.03.23' : event.event_date}
                            </div>
                        </div>
                        <div className="event__inner-title">
                            {event.event_title}
                        </div>
                        <div className="event__inner-image">
                            <img src={photoURL} alt="Фото" />
                        </div>
                        <div className="event__inner-text">
                            {event.event_description}
                        </div>
                    </div>
                    <div className="event__comment">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Event;