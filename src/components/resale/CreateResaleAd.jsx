import { useState } from "react";
import './createResaleAd.css'
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorPopup from "../popup/ErrorPopup";
import { api } from "../../api/api";


const CreateResaleAd = () => {
    const userState = useSelector((store) => store.user)
    const user_id = userState.id;
    const [form, setForm] = useState({ creator_id: user_id, resale_title: '', resale_description: '', resale_price: '', resale_type: '', resale_tel: '', resale_image: '' })

    const handleChangeInput = ({ target }) => {
        if (target.name === 'title') {
            setForm({ ...form, resale_title: target.value })
        } else if (target.name === 'type') {
            setForm({ ...form, resale_type: target.value })
        } else if (target.name === 'descr') {
            setForm({ ...form, resale_description: target.value })
        } else if (target.name === 'price') {
            setForm({ ...form, resale_price: target.value })
        } else if (target.name === 'tel') {
            setForm({ ...form, resale_tel: target.value })
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
            setForm({ ...form, resale_image: currentFile })
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (userState.isAuth) {
            api.createNewResale(form).then(window.location.replace('http://localhost:3000' + '/resale'))
        } else {
            const popup = document.querySelector('.popup__auth');
            popup.classList.add('active')
            setTimeout(() => popup.classList.remove('active'), 3 * 1000);
        }
    }


    return (
        <>
            <Header background='#F8FAFC' />
            <div className="create__resale">
                <div className="container">
                    <div className="create__resale-container">
                        <div className="create__resale-inner">
                            <form className="create__resale-form" onSubmit={handleSubmitForm}>
                                <div className="create__resale-name">
                                    <div className="create__resale-label">Название объявления</div>
                                    <input className="create__resale-input" name="title" onChange={handleChangeInput} placeholder="Название товара" value={form.resale_title} />
                                </div>
                                <div className="create__resale-type">
                                    <div className="create__resale-label">Вид объявления</div>
                                    <input className="create__resale-input" name="type" onChange={handleChangeInput} placeholder="Тип товара" value={form.resale_type} />
                                </div>
                                <div className="create__resale-descr">
                                    <div className="create__resale-label">Описание </div>
                                    <textarea className="create__resale-textarea" name="descr" onChange={handleChangeInput} placeholder="Не указывайте в описании телефон и e-mail — для этого есть отдельные поля" value={form.resale_description} />
                                </div>
                                <div className="create__resale-price--photo">
                                    <div className="create__resale-price">
                                        <div className="create__resale-label">Цена</div>
                                        <input className="create__resale-input" name="price" onChange={handleChangeInput} value={form.resale_price} />
                                    </div>
                                    <div className="create__resale-photo">
                                        <input type="file" name="file" id="file" className="input__file" onChange={handleFileUpload} />
                                        <label htmlFor="file" className="event__create__btn-send-photo">
                                            <span className="input__file-text">Загрузить фото</span>
                                            <img src={require('./img/download_icon.png')} />
                                        </label>
                                    </div>
                                </div>
                                <div className="create__resale-tel">
                                    <div className="create__resale-label">Номер телефона</div>
                                    <input className="create__resale-input" name="tel" onChange={handleChangeInput} placeholder="+7" value={form.resale_tel} />
                                </div>
                                <div className="create__resale-btns">
                                    <button className="create__resale-btn--submit" type='submit'>
                                        Разместить
                                    </button>
                                    <NavLink to="/resale">
                                        <button className="create__resale-btn--cancel">
                                            Отмена
                                        </button>
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorPopup target="auth" text='Для создания мероприятией нужно войти в аккаунт' />
            <ErrorPopup target="files" text='Разрешены только изображения' />
            <RegAuthFooter textColor='#52525B' bgColor='#F8FAFC' />
        </>
    )
}

export default CreateResaleAd;