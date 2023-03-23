import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import EventCard from './EventCard'
import PendingPage from '../pendingPage/PendingPage'
import Pagination from '../pagination/Pagination';
import RegAuthFooter from '../footer/RegAuthFooter'
import './events.css'
import { eventApi } from '../../api/eventApi';

const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector((store) => store.events)
    const loadStatus = useSelector((store) => store.loadStatus)
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const countEventsPerPage = 3;
    const lastEventIndex = currentPage * countEventsPerPage;
    const firstEventIndex = lastEventIndex - countEventsPerPage;
    const filteredEvent = events.filter(el => el.event_title?.toLowerCase().includes(search.toLowerCase()));
    const currentEvents = filteredEvent.sort((a, b) => parseFloat(b.event_id) - parseFloat(a.event_id)).slice(firstEventIndex, lastEventIndex);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [search])


    useEffect(() => {
        dispatch(eventApi.getEvents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearchChange = ({ target }) => {
        setSearch(target.value);
    }

    if (loadStatus.status === 'pending') {
        return <PendingPage text='Ищем самые крутые мероприятия специально для тебя'/>
    }

    return (
        <>
            <Header bgColor='#F8FAFC' />
            <section className="events">
                <div className="container">
                    <div className="events__search">
                        <input className="snowboard__input events__search-input" placeholder='Найти мероприятие по названию' value={search} onChange={handleSearchChange} />
                        <NavLink to="create-new">
                            <button className="snowboard__btn create__event-btn">
                                Создать мероприятие
                            </button>
                        </NavLink>
                    </div>
                    {currentPage === 1 && currentEvents.length > 0 ?
                        (<div className='events__hello'>
                            <div className='events__hello-title'>
                                Взгляни на ближайшие мероприятия!
                            </div>
                            <div className='events__hello-subtitle'>
                                Уже совсем скоро мы вновь встретимся в горах, чтобы наслаждаться каждым новым днём, сноубордингом, горными лыжами, новыми и старыми друзьями.
                            </div>
                        </div>) : null}
                    <div className="events__cards">
                        {currentEvents.map(el => <EventCard
                            key={el.event_id}
                            id={el.event_id}
                            name={el.event_title}
                            text={el.event_description === undefined ? 'Не найдено' : el.event_description}
                            date={el.event_date === null ? '01.04.2023' : el.event_date}
                            event_image_path={el.event_image_path} />)}
                    </div>
                    {filteredEvent.length > 0 ?
                        <Pagination countPerPage={countEventsPerPage} totalCount={filteredEvent.length} paginate={paginate} currentPagePicked={currentPage} />
                        : <div className='events__not-exist'>Мероприятий не найдено {':('}</div>}
                </div>
            </section>
            <RegAuthFooter bgColor='#F8FAFC'/>
        </>
    )
}

export default Events;