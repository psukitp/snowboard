import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { api } from '../../api/api';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import EventCard from './EventCard'
import './events.css'


const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector((store) => store.events)
    const [search, setSearch] = useState('');


    useEffect(() => {
        dispatch(api.getEvents())
    }, [])

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
    }

    return (
        <>
        <Header background='#fff'/>
            <section className="events">
                <div className="container">
                    <div className="events__search">
                        <input className="events__search-input" placeholder='Найти мероприятие по названию' value={search} onChange={handleSearchChange} />
                        <NavLink to="create-new">
                            <button className="create__event-btn">
                                Создать мероприятие
                            </button>
                        </NavLink>
                    </div>
                    <div className="events__cards">
                        {events.slice(0).reverse().map(el => el.event_title?.toLowerCase().includes(search.toLowerCase()) ? <EventCard
                            key={el.event_id}
                            id={el.event_id}
                            name={el.event_title}
                            text={el.event_description === undefined ? 'Не найдено' : el.event_description}
                            event_image_path={el.event_image_path} /> : null)}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Events;