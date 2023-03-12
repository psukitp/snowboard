import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { api } from '../../api/api';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import EventCard from './EventCard'
import './events.css'
import Pagination from '../pagination/Pagination';


const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector((store) => store.events)
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const countEventsPerPage = 6;

    const lastEventIndex = currentPage * countEventsPerPage;
    const firstEventIndex = lastEventIndex - countEventsPerPage;
    const currentEventsCount = events.sort((a, b) => parseFloat(b.event_id) - parseFloat(a.event_id)).slice(firstEventIndex, lastEventIndex);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(api.getEvents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
    }

    return (
        <>
            <Header bgColor='#fff' />
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
                        {currentEventsCount.map(el => el.event_title?.toLowerCase().includes(search.toLowerCase()) ? <EventCard
                            key={el.event_id}
                            id={el.event_id}
                            name={el.event_title}
                            text={el.event_description === undefined ? 'Не найдено' : el.event_description}
                            event_image_path={el.event_image_path} /> : null)}
                    </div>
                    <Pagination countPerPage={countEventsPerPage} totalCount={events.length} paginate={paginate} currentPagePicked={currentPage}/>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Events;