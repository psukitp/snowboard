import './event.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import { useParams } from 'react-router';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Comments from '../comment/Comments';
import { NavLink } from 'react-router-dom';



const Event = () => {
    const { id } = useParams();
    const userState = useSelector((store) => store.user);
    const [myEvent, setMyEvent] = useState(false)
    const [editEvent, setEditEvent] = useState({ title: '', description: '' })
    const [isEdit, setIsEdit] = useState(false);
    const [style, setStyle] = useState({ paddingTop: 0 })
    const dispatch = useDispatch();
    const event = useSelector((store) => store.currentEvent);

    useEffect(() => {
        if (id !== undefined) {
            dispatch(api.getOneEvent(id));
        }
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState])

    useEffect(() => {
        if (userState.id === event.creator_id) {
            setMyEvent(true)
            setStyle({ paddingTop: 48 })
        } else {
            setMyEvent(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event])


    let photoURL = ''
    if (event.event_image_path === null) {
        photoURL = `http://snowboard.na4u.ru/event_image/standard.jpeg`
    } else {
        photoURL = `http://snowboard.na4u.ru/${event.event_image_path}`;
    }

    const descr_edit_block = document.querySelector('.descr__edit-block');
    const title_edit_block = document.querySelector('.title__edit-block');

    const handleEditButton = (e) => {
        e.preventDefault();
        setEditEvent({
            title: event.event_title,
            description: event.event_description
        })
        isEdit ? setIsEdit(false) : setIsEdit(true);
    }

    const handleEditDescr = (e) => {
        setEditEvent({ ...editEvent, description: e.target.value })
    }

    const handleEditTitle = (e) => {
        setEditEvent({ ...editEvent, title: e.target.value })
    }


    const editEventBtn = () => {
        dispatch(api.updateEvent(id, editEvent.title, editEvent.description))
        setIsEdit(false);
    }

    return (
        <>
            <Header bgColor='#fff' />
            <div className="event">
                <div className="container">
                    <div className='event__btn'>
                        <NavLink to='/events'>
                            <button className='snowboard__btn event__back-btn'>
                                Назад
                            </button>
                        </NavLink>
                    </div>
                    <div className="event__inner">
                        <div className="event__inner-image" style={style}>
                            <img src={photoURL} alt="Фото" />
                        </div>
                        <div className='event__inner-info'>
                            <div className='event__edit'>
                                {myEvent ? <button className='snowboard__btn edit-btn' onClick={handleEditButton}>{isEdit ? 'Отмена' : 'Редактировать'}</button> :
                                    null
                                }
                                {isEdit ? <button className='snowboard__btn edit__ok-btn' onClick={editEventBtn}>ОК</button> : null}
                            </div>
                            <div className="event__inner-title">
                                {event.event_title}
                                {isEdit ? <div className='event__edit-block'>
                                    <input className='snowboard__input title__edit-input' value={editEvent.title} onChange={handleEditTitle} />
                                </div>
                                    : null}
                            </div>
                            <div className="event__inner-text">
                                {event.event_description}
                                {isEdit ? <div className='event__edit-block'>
                                    <textarea className='snowboard__textarea descr__edit-textarea' value={editEvent.description} onChange={handleEditDescr} />
                                </div>
                                    : null}
                            </div>
                            <div className="event__inner-date">
                                {event.event_date === null ? '01.03.23' : event.event_date}
                            </div>
                        </div>
                    </div>
                    <div className="event__comment">
                        <Comments event_id={id} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Event;