import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { api } from "../../api/api"
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ErrorPopup from "../popup/ErrorPopup"
import { IMaskInput } from "react-imask"
import ReactLoading from 'react-loading'
import './createEventForm.css'


const CreateEventForm = () => {
    const userState = useSelector((store) => store.user);
    const user_id = userState.id;
    const [form, setForm] = useState({ creator_id: user_id, event_title: '', event_date: '', event_description: '', event_image: '' })

    const checkEmpty = ({ resale_title, event_date, event_description }) => {
        return !(resale_title !== '' && event_date !== '' && event_description !== '')
    }

    const showPopup = (name) => {
        const popup = document.querySelector(`.popup__${name}`);
        popup.classList.add('active')
        setTimeout(() => popup.classList.remove('active'), 3 * 1000);
    }


    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const dd = Number(form.event_date.slice(0, 2));
        const mm = Number(form.event_date.slice(3, 5));
        const yyyy = Number(form.event_date.slice(6, 10));
        const dateCorrect = dd > 0 && dd < 32 && mm > 0 && mm < 13 && yyyy > 2022;
        if (userState.isAuth && dateCorrect && !checkEmpty(form)) {
            const loader = document.querySelector('.event__create__btn-submit--loader');
            loader.classList.add('active');
            await api.createNewEvent(form);
            window.location.replace("https://snowboarding-portal.na4u.ru/events");
        } else if (!userState.isAuth) {
            showPopup('auth');
        } else if (checkEmpty(form)) {
            showPopup('data')
        } else {
            showPopup('date')
        }
    }

    const handleChangeInput = ({ target }) => {
        if (target.name === "title") {
            setForm({ ...form, event_title: target.value })
        } else if (target.name === "date") {
            setForm({ ...form, event_date: target.value })
        } else {
            setForm({ ...form, event_description: target.value })
        }
    }

    const handleFileUpload = ({ target }) => {
        const currentFileName = target.files[0].name;
        const currentFile = target.files[0];
        if (!["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(currentFile.type)) {
            showPopup('files')
        }
        else {
            let fileName = '';
            if (currentFileName.length > 14) {
                fileName = currentFileName.slice(0, 5) + '...' + currentFileName.slice(-6)
            } else {
                fileName = currentFileName;
            }
            const label = document.querySelector('.input__file-text');
            label.innerHTML = fileName;
            setForm({ ...form, event_image: currentFile })
        }
    }

    return (
        <>
            <Header bgColor='#F8FAFC' />
            <section className="event__create">
                <div className="container">
                    <div className='event__create__inner'>
                        <form className="event__create__form" onSubmit={handleSubmitForm} encType="multipart/form-data">
                            <div className="event__create__label">Заголовок</div>
                            <input className="snowboard__input event__create__input" name="title" onChange={handleChangeInput} placeholder="Введите название мероприятия" value={form.title} />
                            <div className="event__create-date">
                                <div className="event__create__label">Дата </div>
                                <IMaskInput mask={'00{.}00{.}0000'} radix='.' className="snowboard__input event__create__input" name="date" placeholder="__.__.__" onChange={handleChangeInput} />
                            </div>
                            <div className="event__create__label">Описание </div>
                            <textarea className="snowboard__textarea event__create__textarea" name="description" onChange={handleChangeInput} placeholder="Введите описание мероприятия" value={form.description} />
                            <div className="event__create-photo">
                                <input type="file" name="file" id="file" className="input__file" onChange={handleFileUpload} />
                                <label htmlFor="file" className="snowboard__btn event__create__btn-send-photo">
                                    <span className="input__file-text">Загрузить фото</span>
                                    <img src={require('./img/download_icon.png')} alt='Загрузить' />
                                </label>
                            </div>
                            <div className="event__create-btns">
                                <button className="snowboard__btn event__create__btn-submit" type="submit">
                                    <ReactLoading type='spin' color='#fff' height={20} width={20} className='event__create__btn-submit--loader' />
                                    Создать мероприятие
                                </button>
                                <NavLink to="/events" className="event__cancel-link">
                                    <button className="snowboard__btn event__create__btn-cancel" type="button">Отмена</button>
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
                <ErrorPopup target="auth" text='Для создания мероприятией нужно войти в аккаунт' />
                <ErrorPopup target="files" text='Разрешены только изображения' />
                <ErrorPopup target="date" text='Введи корректную дату' />
                <ErrorPopup target="data" text='Кажется, ты ввел не все данные :(' />
            </section>
            <Footer />
        </>
    )
}

export default CreateEventForm;