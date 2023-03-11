import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../api/api';
import Header from '../header/Header'
import './resale.css'
import ResaleCardItem from './ResaleCardItem';
import ResaleListItem from './ResaleListItem';
import RegAuthFooter from '../footer/RegAuthFooter';
import { NavLink } from 'react-router-dom';

const Resale = () => {
    const [isCard, setIsCard] = useState(true);
    const dispatch = useDispatch();
    const resales = useSelector((store) => store.resales)

    useEffect(() => {
        dispatch(api.getResales())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setList = () => {
        setIsCard(false);

        const icon_list = document.querySelector('.img__list-icon');
        const rects_list_inner = icon_list.querySelectorAll('.img__edit-rect--blue');
        const rects_list_stroke = icon_list.querySelectorAll('.img__edit-rect--stroke');
        rects_list_inner.forEach(el => el.style.fill = '#4482B9')
        rects_list_stroke.forEach(el => el.style.stroke = '#4482B9')

        const icon_card = document.querySelector('.img__cards-icon');
        const rects_card_inner = icon_card.querySelectorAll('.img__edit-rect--blue');
        const rects_card_stroke = icon_card.querySelectorAll('.img__edit-rect--stroke');
        rects_card_inner.forEach(el => el.style.fill = '#CBD5E1')
        rects_card_stroke.forEach(el => el.style.stroke = '#CBD5E1')
    }

    const setCard = () => {
        setIsCard(true);

        const icon_list = document.querySelector('.img__list-icon');
        const rects_list_inner = icon_list.querySelectorAll('.img__edit-rect--blue');
        const rects_list_stroke = icon_list.querySelectorAll('.img__edit-rect--stroke');
        rects_list_inner.forEach(el => el.style.fill = '#CBD5E1')
        rects_list_stroke.forEach(el => el.style.stroke = '#CBD5E1')


        const icon_card = document.querySelector('.img__cards-icon');
        const rects_card_inner = icon_card.querySelectorAll('.img__edit-rect--blue');
        const rects_card_stroke = icon_card.querySelectorAll('.img__edit-rect--stroke');
        rects_card_inner.forEach(el => el.style.fill = '#4482B9')
        rects_card_stroke.forEach(el => el.style.stroke = '#4482B9')


    }

    return (
        <>
            <Header bgColor='#F8FAFC' />
            <section className="resale">
                <div className="container">
                    <div className="resale__inner">
                        <div className="resale__switch">
                            <button className='switch__btn' onClick={setCard}>
                                {/* <img src={require("./img/cards_icon.png")} alt='Карточками' />
                                 */}
                                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className='img__cards-icon'>
                                    <rect x="0.5" y="1" width="39" height="39" rx="2.5" fill="white" stroke="#4482B9" className='img__edit-rect--stroke'/>
                                    <rect x="8" y="8.5" width="10.6667" height="10.6667" fill="#4482B9" className='img__edit-rect--blue'/>
                                    <rect x="21.3334" y="8.5" width="10.6667" height="10.6667" fill="#4482B9" className='img__edit-rect--blue'/>
                                    <rect x="8" y="21.8334" width="10.6667" height="10.6667" fill="#4482B9" className='img__edit-rect--blue'/>
                                    <rect x="21.3334" y="21.8334" width="10.6667" height="10.6667" fill="#4482B9" className='img__edit-rect--blue'/>
                                </svg>

                            </button>
                            <button className='switch__btn' onClick={setList}>
                                {/* <img src={require("./img/list_icon.png")} alt='Строками'/> */}
                                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className='img__list-icon'>
                                    <rect x="0.5" y="1" width="39" height="39" rx="2.5" fill="white" stroke="#CBD5E1" className='img__edit-rect--stroke' />
                                    <rect x="8" y="9.83337" width="5.33333" height="5.33333" fill="#CBD5E1" className='img__edit-rect--blue' />
                                    <rect x="14.6666" y="11.1666" width="16" height="2.66667" fill="#CBD5E1" className='img__edit-rect--blue' />
                                    <rect x="8" y="17.8334" width="5.33333" height="5.33333" fill="#CBD5E1" className='img__edit-rect--blue' />
                                    <rect x="14.6666" y="19.1666" width="16" height="2.66667" fill="#CBD5E1" className='img__edit-rect--blue' />
                                    <rect x="8" y="25.8334" width="5.33333" height="5.33333" fill="#CBD5E1" className='img__edit-rect--blue' />
                                    <rect x="14.6666" y="27.1666" width="16" height="2.66667" fill="#CBD5E1" className='img__edit-rect--blue' />
                                </svg>

                            </button>
                        </div>
                        <div>
                            <NavLink to="create-new">
                                <button className="resale__create-new">
                                    Создать объявление
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="resale__products">
                        {isCard ?
                            resales.slice(0).reverse().map(el => <ResaleCardItem
                                ad_image_path={el.ad_image_path}
                                product_type={el.product_type_name}
                                ad_post_name={el.post_name}
                                ad_post_text={el.post_text}
                                ad_price={el.price} />) :
                            resales.map(el => <ResaleListItem />)
                        }
                    </div>
                </div>
            </section>
            <RegAuthFooter textColor='#52525B' bgColor='#F8FAFC' />
        </>
    )
}

export default Resale;