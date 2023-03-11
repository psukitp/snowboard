import './event.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import { useParams } from 'react-router';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Comments from '../comment/Comments';



const Event = () => {
    const { id } = useParams();
    const userState = useSelector((store) => store.user);
    const [myEvent, setMyEvent] = useState(false)
    const [editEvent, setEditEvent] = useState({ title: '', description: '' })
    const dispatch = useDispatch();
    const event = useSelector((store) => store.currentEvent);

    useEffect(() => {
        if (id !== undefined) {
            dispatch(api.getOneEvent(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState])

    useEffect(() => {
        userState.id === event.creator_id ? setMyEvent(false) : setMyEvent(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event])


    let photoURL = ''
    if (event.event_image_path === null) {
        photoURL = `http://localhost:3001/event_image/standard.jpeg`
    } else {
        photoURL = `http://localhost:3001/${event.event_image_path}`;
    }

    const descr_edit_block = document.querySelector('.descr__edit-block');
    const title_edit_block = document.querySelector('.title__edit-block');

    const handleEditDescrButton = (e) => {
        e.preventDefault();
        setEditEvent({
            title: event.event_title,
            description: event.event_description
        })
        descr_edit_block.classList.add('active');
    }

    const handleEditTitleButton = (e) => {
        e.preventDefault();
        setEditEvent({
            title: event.event_title,
            description: event.event_description
        })
        title_edit_block.classList.add('active');
    }

    const handleEditDescr = (e) => {
        setEditEvent({ ...editEvent, description: e.target.value })
    }

    const handleEditTitle = (e) => {
        setEditEvent({ ...editEvent, title: e.target.value })
    }

    const editEventBtn = () => {
        dispatch(api.updateEvent(id, editEvent.title, editEvent.description))
        descr_edit_block.classList.remove('active');
        title_edit_block.classList.remove('active');
    }

    return (
        <>
            <Header bgColor='#fff' />
            <div className="event">
                <div className="container">
                    <div className="event__inner">
                        <div className="event__inner-creator">
                            <div className="event__inner-author">
                                {event.name} {event.s_name}
                            </div>
                            <div className="event__inner-date">
                                {event.event_date === null ? '01.03.23' : event.event_date}
                            </div>
                        </div>
                        {myEvent ? null : <button className='edit-btn' onClick={handleEditTitleButton}>Редактировать</button>}
                        <div className="event__inner-title">
                            {event.event_title}
                            <div className='title__edit-block'>
                                <input className='title__edit-input' value={editEvent.title} onChange={handleEditTitle} />
                                <button className='edit__ok-btn' onClick={editEventBtn}>ОК</button>
                            </div>
                        </div>
                        <div className="event__inner-image">
                            <img src={photoURL} alt="Фото" />
                        </div>
                        {myEvent ? null : <button className='edit-btn' onClick={handleEditDescrButton}>Редактировать</button>}
                        <div className="event__inner-text">
                            {event.event_description}
                            <div className='descr__edit-block'>
                                <textarea className='descr__edit-textarea' value={editEvent.description} onChange={handleEditDescr} />
                                <button className='edit__ok-btn' onClick={editEventBtn}>ОК</button>
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