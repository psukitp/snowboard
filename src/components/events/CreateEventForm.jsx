import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { api } from "../../api/api"
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ErrorPopup from "../popup/ErrorPopup"
import './createEventForm.css'
import { IMaskInput } from "react-imask"


const CreateEventForm = () => {
    const userState = useSelector((store) => store.user);
    const user_id = userState.id;
    const [form, setForm] = useState({ creator_id: user_id, event_title: '', event_date: '', event_description: '', event_image: '' })


    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (userState.isAuth) {
            console.log('отправляю')
            api.createNewEvent(form).then(window.location.replace("http://localhost:3000" + "/events"));
        } else {
            const popup = document.querySelector('.popup__auth');
            popup.classList.add('active')
            setTimeout(() => popup.classList.remove('active'), 3 * 1000);
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
            const popup = document.querySelector('.popup__files');
            popup.classList.add('active')
            setTimeout(() => popup.classList.remove('active'), 3 * 1000);
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
                            <input className="event__create__input" name="title" onChange={handleChangeInput} placeholder="Введите название мероприятия" value={form.title} />
                            <div className="event__create-date">
                                <div className="event__create__label">Дата </div>
                                {/* <input className="event__create__input" name="date" onChange={handleChangeInput} placeholder="__.__.__" value={form.event_date} /> */}
                                <IMaskInput mask={Date} radix='.' className="event__create__input" name="date" placeholder="__.__.__" onChange={handleChangeInput} />
                            </div>
                            <div className="event__create__label">Описание </div>
                            <textarea className="event__create__textarea" name="description" onChange={handleChangeInput} placeholder="Введите описание мероприятия" value={form.description} />
                            <div className="event__create-photo">
                                <input type="file" name="file" id="file" className="input__file" onChange={handleFileUpload} />
                                <label htmlFor="file" className="event__create__btn-send-photo">
                                    <span className="input__file-text">Загрузить фото</span>
                                    <img src={require('./img/download_icon.png')} alt='Загрузить' />
                                </label>
                            </div>
                            <div className="event__create-btns">
                                <button className="event__create__btn-submit" type="submit">Создать мероприятие</button>
                                <NavLink to="/events" className="event__cancel-link">
                                    <button className="event__create__btn-cancel" type="button">Отмена</button>
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
                <ErrorPopup target="auth" text='Для создания мероприятией нужно войти в аккаунт' />
                <ErrorPopup target="files" text='Разрешены только изображения' />
            </section>
            <Footer />
        </>
    )
}

export default CreateEventForm;