import { useEffect, useState } from "react";
import ReactLoading from 'react-loading'
import './createResaleAd.css'
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorPopup from "../popup/ErrorPopup";
import { api } from "../../api/api";
import { IMaskInput } from "react-imask";
import SnowboardProperty from "./adTypeComponents/SnowboardProperty";
import ShoeProperty from "./adTypeComponents/ShoeProperty";
import BindingProperty from "./adTypeComponents/BindingProperty";
import ClothesProperty from "./adTypeComponents/ClothesProperty";


const CreateResaleAd = () => {
    const userState = useSelector((store) => store.user)
    const productTypes = useSelector((store) => store.productTypes)
    const [form, setForm] = useState({ creator_id: userState.id, resale_title: '', resale_description: '', resale_price: '', resale_type: 1, resale_tel: '+7', resale_image: '' })
    const [properties, setPropirties] = useState({});

    const checkEmpty = ({ resale_title, resale_description, resale_price, resale_tel }) => {
        return !(resale_title !== '' && resale_description !== '' && resale_price !== '' && resale_tel !== '')
    }

    const showPopup = (name) => {
        const popup = document.querySelector(`.popup__${name}`);
        popup.classList.add('active')
        setTimeout(() => popup.classList.remove('active'), 3 * 1000);
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(api.getProductTypes())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeInput = ({ target }) => {
        if (target.name === 'title') {
            setForm({ ...form, resale_title: target.value })
            const attention = document.querySelector('.title__attention');
            target.value.length >= 20 ?
                attention.classList.add('active') :
                attention.classList.remove('active')
        } else if (target.name === 'descr') {
            setForm({ ...form, resale_description: target.value })
        } else if (target.name === 'price') {
            setForm({ ...form, resale_price: target.value })
        } else if (target.name === 'tel') {
            setForm({ ...form, resale_tel: target.value })
        }
        checkObject(properties);
    }

    const handleChangeSelect = (e) => {
        setForm({ ...form, resale_type: e.target.selectedIndex + 1 })
        setPropirties({});
    }

    const changeProperties = (property) => {
        setPropirties(property);
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
            setForm({ ...form, resale_image: currentFile })
        }
    }

    const checkObject = (count, obj) => {
        let resCount = 0
        if (obj !== undefined) {
            let array = Object.values(obj);
            for (let i = 0; i < array.length; i++) {
                if (array[i] !== '') {
                    resCount++;
                }
            }
        }
        return resCount === count;
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (userState.isAuth && form.resale_title.length < 20 && !checkEmpty(form) && ((form.resale_type === 1 && checkObject(3, properties)) || (form.resale_type !== 1 && checkObject(2, properties)))) {
            const loader = document.querySelector('.create__resale-btn--submit--loader');
            loader.classList.add('active');
            await api.createNewResale(form, properties)
            window.location.replace('https://snowboarding-portal.na4u.ru/resale')
        } else if (!userState.isAuth) {
            showPopup('auth')
        } else {
            showPopup('data')
        }
    }


    return (
        <>
            <Header bgColor='#F8FAFC' />
            <div className="create__resale">
                <div className="container">
                    <div className="create__resale-container">
                        <div className="create__resale-inner">
                            <form className="create__resale-form" onSubmit={handleSubmitForm}>
                                <div className="create__resale-name">
                                    <div className="create__resale-label">Название объявления</div>
                                    <p className="title__attention">Название не должно быть длиннее 20 символов</p>
                                    <input className="snowboard__input create__resale-input" name="title" onChange={handleChangeInput} placeholder="Вводите сюда только модель :)" value={form.resale_title} />
                                </div>
                                <div className="create__resale-type">
                                    <div className="create__resale-label">Вид объявления</div>
                                    <select className="snowboard__input create__resale-input" name="type" onChange={handleChangeSelect}>
                                        {productTypes.map(el =>
                                            <option key={el.product_type_id} id={el.product_type_id} >{el.product_type_name}</option>)}
                                    </select>
                                    {form.resale_type === 1 ? <SnowboardProperty changeProperties={changeProperties} /> : null}
                                    {form.resale_type === 3 ? <ShoeProperty changeProperties={changeProperties} /> : null}
                                    {form.resale_type === 4 ? <BindingProperty changeProperties={changeProperties} /> : null}
                                    {form.resale_type === 5 ? <ClothesProperty changeProperties={changeProperties} /> : null}
                                </div>
                                <div className="create__resale-descr">
                                    <div className="create__resale-label">Описание </div>
                                    <textarea className="snowboard__textarea create__resale-textarea" name="descr" onChange={handleChangeInput} placeholder="Не указывайте в описании телефон и e-mail — для этого есть отдельные поля" value={form.resale_description} />
                                </div>
                                <div className="create__resale-price--photo">
                                    <div className="create__resale-price">
                                        <div className="create__resale-label">Цена</div>
                                        <IMaskInput mask='0000000' className="snowboard__input create__resale-input" name="price" onChange={handleChangeInput} value={form.resale_price} placeholder='₽' />
                                    </div>
                                    <div className="create__resale-photo">
                                        <input type="file" name="file" id="file" className="input__file" onChange={handleFileUpload} />
                                        <label htmlFor="file" className="snowboard__btn event__create__btn-send-photo">
                                            <span className="input__file-text">Загрузить фото</span>
                                            <img src={require('./img/download_icon.png')} alt='Загрузить' />
                                        </label>
                                    </div>
                                </div>
                                <div className="create__resale-tel">
                                    <div className="create__resale-label">Номер телефона</div>
                                    <IMaskInput mask='+{7}(000)000-00-00' className="snowboard__input create__resale-input" name="tel" onChange={handleChangeInput} placeholder="+7" value={form.resale_tel} />
                                </div>
                                <div className="create__resale-btns">
                                    <button className="snowboard__btn create__resale-btn--submit" type='submit'>
                                        <ReactLoading type='spin' color='#fff' height={20} width={20} className='create__resale-btn--submit--loader' />
                                        Разместить
                                    </button>
                                    <NavLink to="/resale">
                                        <button className="snowboard__btn create__resale-btn--cancel">
                                            Отмена
                                        </button>
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorPopup target="auth" text='Для размещения объявлений нужно войти в аккаунт' />
            <ErrorPopup target="files" text='Разрешены только изображения' />
            <ErrorPopup target="data" text='Кажется, ты ввел не все данные :(' />
            <RegAuthFooter textColor='#52525B' bgColor='#F8FAFC' />
        </>
    )
}

export default CreateResaleAd;