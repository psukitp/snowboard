import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../api/api';
import Header from '../header/Header'
import './resale.css'
import ResaleCardItem from './ResaleCardItem';
import ResaleListItem from './ResaleListItem';
import RegAuthFooter from '../footer/RegAuthFooter';
import { NavLink } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import PendingPage from '../pendingPage/PendingPage';

const Resale = () => {
    const [isCard, setIsCard] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [listColor, setListColor] = useState('#CBD5E1');
    const [cardsColor, setCardsColor] = useState('#4482B9');
    const countCardPerPage = 6;
    const countItemsPerPage = 4;
    const dispatch = useDispatch();
    const resales = useSelector((store) => store.resales)
    const loadStatus = useSelector((store) => store.loadStatus)
    const lastCardIndex = currentPage * countCardPerPage;
    const firstCardIndex = lastCardIndex - countCardPerPage;
    const currentCardCount = resales.sort((a, b) => parseFloat(b.ad_post_id) - parseFloat(a.ad_post_id)).slice(firstCardIndex, lastCardIndex);

    const lastItemIndex = currentPage * countItemsPerPage;
    const firstItemIndex = lastItemIndex - countItemsPerPage;
    const currentItemCount = resales.sort((a, b) => parseFloat(b.ad_post_id) - parseFloat(a.ad_post_id)).slice(firstItemIndex, lastItemIndex);

    useEffect(() => {
        dispatch(api.getResales())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setList = () => {
        setIsCard(false);
        setListColor('#4482B9');
        setCardsColor('#CBD5E1')
        setCurrentPage(1)
    }

    const setCard = () => {
        setIsCard(true);
        setListColor('#CBD5E1');
        setCardsColor('#4482B9')
        setCurrentPage(1)
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    if (loadStatus.status === 'pending') {
        return <PendingPage />
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
                                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="https://www.w3.org/2000/svg">
                                    <rect x="0.5" y="1" width="39" height="39" rx="2.5" fill="white" stroke={cardsColor} />
                                    <rect x="8" y="8.5" width="10.6667" height="10.6667" fill={cardsColor} />
                                    <rect x="21.3334" y="8.5" width="10.6667" height="10.6667" fill={cardsColor} />
                                    <rect x="8" y="21.8334" width="10.6667" height="10.6667" fill={cardsColor} />
                                    <rect x="21.3334" y="21.8334" width="10.6667" height="10.6667" fill={cardsColor} />
                                </svg>

                            </button>
                            <button className='switch__btn' onClick={setList}>
                                {/* <img src={require("./img/list_icon.png")} alt='Строками'/> */}
                                <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="https://www.w3.org/2000/svg" >
                                    <rect x="0.5" y="1" width="39" height="39" rx="2.5" fill="white" stroke={listColor} />
                                    <rect x="8" y="9.83337" width="5.33333" height="5.33333" fill={listColor} />
                                    <rect x="14.6666" y="11.1666" width="16" height="2.66667" fill={listColor} />
                                    <rect x="8" y="17.8334" width="5.33333" height="5.33333" fill={listColor} />
                                    <rect x="14.6666" y="19.1666" width="16" height="2.66667" fill={listColor} />
                                    <rect x="8" y="25.8334" width="5.33333" height="5.33333" fill={listColor} />
                                    <rect x="14.6666" y="27.1666" width="16" height="2.66667" fill={listColor} />
                                </svg>

                            </button>
                        </div>
                        <div>
                            <NavLink to="create-new">
                                <button className="snowboard__btn resale__create-new">
                                    Создать объявление
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="resale__products">
                        {isCard ?
                            currentCardCount.map(el => <NavLink to={String(el.ad_post_id)}>
                                <ResaleCardItem
                                    key={el.ad_post_id}
                                    ad_image_path={el.ad_image_path}
                                    product_type={el.product_type_name}
                                    ad_post_name={el.post_name}
                                    ad_post_text={el.post_text}
                                    ad_price={el.price?.split( /(?=(?:...)*$)/ ).join(' ')}
                                    other_props={el} />
                            </NavLink>) :
                            currentItemCount.map(el => <NavLink to={String(el.ad_post_id)} className='resale__list-item'>
                                <ResaleListItem
                                    id={el.ad_post_id}
                                    key={el.ad_post_id}
                                    ad_image_path={el.ad_image_path}
                                    product_type={el.product_type_name}
                                    ad_post_name={el.post_name}
                                    ad_post_text={el.post_text}
                                    ad_price={el.price?.split( /(?=(?:...)*$)/ ).join(' ')}
                                    other_props={el} />
                                    </NavLink>)
                        }
                    </div>
                    <Pagination countPerPage={isCard ? countCardPerPage : countItemsPerPage} totalCount={resales.length} paginate={paginate} currentPagePicked={currentPage} />
                </div>
            </section>
            <RegAuthFooter textColor='#52525B' bgColor='#F8FAFC' />
        </>
    )
}

export default Resale;