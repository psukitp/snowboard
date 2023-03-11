import { useState } from "react";
import './createResaleAd.css'
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import { NavLink } from "react-router-dom";


const CreateResaleAd = () => {
    const [form, setForm] = useState({})

    const handleChangeInput = () => {

    }

    const handleFileUpload = () => {

    }


    return (
        <>
            <Header background='#F8FAFC'/>
            <div className="create__resale">
                <div className="container">
                    <div className="create__resale-container">
                        <div className="create__resale-inner">
                            <form className="create__resale-form">
                                <div className="create__resale-name">
                                    <div className="create__resale-label">Название объявления</div>
                                    <input className="create__resale-input" name="title" onChange={handleChangeInput} placeholder="Название товара" value={form.title} />
                                </div>
                                <div className="create__resale-type">
                                    <div className="create__resale-label">Вид объявления</div>
                                    <input className="create__resale-input" name="type" onChange={handleChangeInput} placeholder="Тип товара" value={form.type} />
                                </div>
                                <div className="create__resale-descr">
                                    <div className="create__resale-label">Описание </div>
                                    <textarea className="create__resale-textarea" name="descr" onChange={handleChangeInput} placeholder="Не указывайте в описании телефон и e-mail — для этого есть отдельные поля" value={form.descr} />
                                </div>
                                <div className="create__resale-price--photo">
                                    <div className="create__resale-price">
                                        <div className="create__resale-label">Цена</div>
                                        <input className="create__resale-input" name="price" onChange={handleChangeInput} value={form.price} />
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
                                    <input className="create__resale-input" name="tel" onChange={handleChangeInput} placeholder="+7" value={form.tel} />
                                </div>
                                <div className="create__resale-btns">
                                    <button className="create__resale-btn--submit">
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
            <RegAuthFooter textColor='#52525B' bgColor='#F8FAFC'/>
        </>
    )
}

export default CreateResaleAd;