import { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { api } from "../../api/api";
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import './resaleAd.css'

const ResaleAd = () => {
    const { id } = useParams();
    const userState = useSelector((store) => store.user)
    const resale = useSelector((store) => store.currentResale)
    const [myResale, setMyResale] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editResale, setEditResale] = useState({ title: '', text: '', price: '', tel: '' })
    const [style, setStyle] = useState({ paddingTop: 0 });
    const dispatch = useDispatch();

    let photoURL = ''
    if (resale.ad_image_path === null) {
        photoURL = `http://snowboard.na4u.ru/ad_image/standard.jpeg`
    } else {
        photoURL = `http://snowboard.na4u.ru/${resale.ad_image_path}`;
    }

    useEffect(() => {
        if (id !== undefined) {
            dispatch(api.getOneResale(id));
        }
        window.scrollTo(0, 0);
    }, [userState])

    useEffect(() => {
        if (userState.id === resale.creator_id) {
            setMyResale(true)
            setStyle({ paddingTop: 45 })
        } else {
            setMyResale(false)
        }
    }, [resale]);

    let properties = [];
    if (resale.ad_product_type === 1) {
        properties.push({ name: 'Длина', value: resale.board_size })
        properties.push({ name: 'Прогиб', value: resale.board_deflection })
        properties.push({ name: 'Жесткость', value: resale.board_flex })
    } else if (resale.ad_product_type === 3) {
        properties.push({ name: 'Размер', value: resale.shoe_size })
        properties.push({ name: 'Жесткость', value: resale.shoe_flex })
    } else if (resale.ad_product_type === 4) {
        properties.push({ name: 'Размер', value: resale.binding_size })
        properties.push({ name: 'Жесткость', value: resale.binding_flex })
    } else if (resale.ad_product_type === 5) {
        properties.push({ name: 'Тип', value: resale.clothes_name })
        properties.push({ name: 'Размер', value: resale.clothes_size })
    }


    const editResaleBtn = () => {
        setEditResale({ title: resale.post_name, text: resale.post_text, price: resale.price, tel: resale.ad_telephone });
        isEdit ? setIsEdit(false) : setIsEdit(true);
    }

    const handleEditInput = ({ target }) => {
        if (target.name === 'title') {
            setEditResale({ ...editResale, title: target.value })
        } else if (target.name === 'text') {
            setEditResale({ ...editResale, text: target.value })
        } else if (target.name === 'price') {
            setEditResale({ ...editResale, price: target.value })
        } else {
            setEditResale({ ...editResale, tel: target.value })
        }
    }

    const handleEditResale = () => {
        dispatch(api.updateResale(id, editResale))
        setIsEdit(false);
    }




    return (
        <>
            <Header bgColor='#F8FAFC' />
            <section className="resale__ad">
                <div className="container">
                    <div className='resale__ad-btn'>
                        <NavLink to='/resale'>
                            <button className='snowboard__btn resale__ad-back--btn'>
                                Назад
                            </button>
                        </NavLink>
                    </div>
                    <div className="resale__ad-inner">
                        <div className="resale__ad-image" style={style}>
                            <img src={photoURL} />
                        </div>
                        <div className="resale__ad-info">
                            <div className="resale__ad-edit--block">
                                {myResale ?
                                    <div className='resale__ad-btn'>
                                        <button className="snowboard__btn resale__ad-edit--btn" onClick={editResaleBtn}> {isEdit ? 'Отмена': 'Редактировать'}</button>
                                    </div> :
                                    null
                                }
                                {isEdit ? <button className='snowboard__btn edit__ok-btn' onClick={handleEditResale}>ОК</button> : null}
                            </div>
                            <div className="resale__ad-title">
                                {resale.post_name}
                                {isEdit ? <div className='resal__edit--block'>
                                    <input className='snowboard__input resale__text-edit--input' value={editResale.title} onChange={handleEditInput} name='title' />
                                </div> : null}

                            </div>
                            <div className="resale__ad-text">
                                <span className="extra__text">Описание:</span>
                                {resale.post_text}
                                {isEdit ? <div className='resal__edit--block'>
                                    <textarea className='snowboard__textarea resale__text-edit--textarea' value={editResale.text} onChange={handleEditInput} name='text' />
                                </div> : null}

                            </div>
                            {properties.map(el => (
                                <div className="resale__ad-property">
                                    <span className="extra__text">{el.name + ':'}</span>
                                    {el.value}
                                </div>
                            ))}
                            <div className="resale__ad-price">
                                {resale.price?.split( /(?=(?:...)*$)/ ).join(' ') + ' ₽'}
                                {isEdit ? <div className='resal__edit--block'>
                                    <IMaskInput mask='0000000' className='snowboard__input resale__text-edit--input' value={editResale.price} onChange={handleEditInput} name='price' />
                                </div> : null}

                            </div>
                            <div className="resale__ad-creator">
                                <div className="resale__ad-creator--name">
                                    {resale.login}
                                </div>
                                <div className="resale__ad-creator--tel">
                                    {resale.ad_telephone}
                                    {isEdit ? <div className='resal__edit--block'>
                                        <IMaskInput mask='+{7}(000)000-00-00' className='snowboard__input resale__text-edit--input' value={editResale.tel} onChange={handleEditInput} name='tel' />
                                    </div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <RegAuthFooter bgColor='#F8FAFC' />
        </>
    )
}

export default ResaleAd;