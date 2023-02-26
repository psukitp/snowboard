import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { api } from '../../api/api';
import EventCard from './EventCard'
import './events.css'


const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector((store) => store.events)


    useEffect(() => {
        dispatch(api.getEvents())
    }, [])

    return (
        <>
            <section className="events">
                <div className="container">
                    <div className="events__search">
                        <input className="events__search-input" placeholder='Найти мероприятие' />
                        <NavLink to="create-new">
                            <button className="create__event-btn">
                                Создать мероприятие
                            </button>
                        </NavLink>
                    </div>
                    <div className="events__cards">
                        {events.map(el => <EventCard key={el.event_id} name={el.event_title} text={el.event_description} />)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Events;