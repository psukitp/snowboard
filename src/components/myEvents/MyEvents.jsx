import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import RegAuthFooter from "../footer/RegAuthFooter";
import { eventApi } from "../../api/eventApi";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import EventCard from "../events/EventCard";
import Pagination from "../pagination/Pagination";
import './myEvents.scss'

const MyEvents = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const userStatus = useSelector((store) => store.user);
    const userId = userStatus.id;
    const myEvents = useSelector((store) => store.myEvents);
    const countCardPerPage = 6;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(eventApi.getMyEvents(userId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="main my-events__main">
                    <section className="my-events">
                        <div className="my-events__title">
                            Мои мероприятия
                        </div>
                        <div className="my-events__products">
                            {myEvents.length > 0 ? null : <div className="my-events__filler">Ты еще не создал ни одного мероприятия!</div>}
                            {myEvents.map(el =>
                                <NavLink to={`/events/` + String(el.event_id)}>
                                    <EventCard
                                        key={el.event_id}
                                        id={el.event_id}
                                        name={el.event_title}
                                        text={el.event_description === undefined ? 'Не найдено' : el.event_description}
                                        date={el.event_date === null ? '01.04.2023' : el.event_date}
                                        event_image_path={el.event_image_path} />
                                </NavLink>
                            )}
                        </div>
                        {myEvents.length > 0 ? <Pagination countPerPage={countCardPerPage} totalCount={myEvents.length} paginate={paginate} currentPagePicked={currentPage} /> : null}
                    </section>
                </div>
                <RegAuthFooter />
            </div >
        </>
    )

}

export default MyEvents;