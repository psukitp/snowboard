import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../header/Header'
import EventCard from './EventCard'
import PendingPage from '../pendingPage/PendingPage'
import Pagination from '../pagination/Pagination';
import RegAuthFooter from '../footer/RegAuthFooter'
import './events.scss'
import { eventApi } from '../../api/eventApi';
import ErrorPopup from '../popup/ErrorPopup';
import { popupUtils } from '../../utils/popup.utils';

const Events = () => {
    const dispatch = useDispatch();
    const events = useSelector((store) => store.events)
    const loadStatus = useSelector((store) => store.loadStatus)
    const userStatus = useSelector((store) => store.user)
    const navigate = useNavigate();
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

    const navigateToCreateEvent = () => {
        if (userStatus.isAuth) {
            navigate('create-new')
        } else {
            popupUtils.showPopup('auth');
        }
    }

    if (loadStatus.status === 'pending') {
        return <PendingPage />
    }

    return (
        <>
            <Header />
            <section className="events">
                <div className="container">
                    <div className="events__search">
                        <input className="snowboard__input events__search-input" placeholder='Найти мероприятие по названию' value={search} onChange={handleSearchChange} />
                        <button className="snowboard__btn create__event-btn" onClick={navigateToCreateEvent}>
                            Создать мероприятие
                        </button>
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
                        {currentEvents.map(el => <NavLink to={'' + String(el.event_id)}>
                            <EventCard
                                key={el.event_id}
                                id={el.event_id}
                                name={el.event_title}
                                text={el.event_description === undefined ? 'Не найдено' : el.event_description}
                                date={el.event_date === null ? '01.04.2023' : el.event_date}
                                event_image_path={el.event_image_path} />
                        </NavLink>)}
                    </div>
                    {filteredEvent.length > 0 ?
                        <Pagination countPerPage={countEventsPerPage} totalCount={filteredEvent.length} paginate={paginate} currentPagePicked={currentPage} />
                        : <div className='events__not-exist'>Мероприятий не найдено {':('}</div>}
                </div>
            </section>
            <RegAuthFooter />
            <ErrorPopup target="auth" text='Для создания мероприятией нужно войти в аккаунт' />
        </>
    )
}

export default Events;