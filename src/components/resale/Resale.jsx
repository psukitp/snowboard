import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../api/api';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './resale.css'
import ResaleCardItem from './ResaleCardItem';
import ResaleListItem from './ResaleListItem';

const Resale = () => {
    const [isCard, setIsCard] = useState(true);
    const dispatch = useDispatch();
    const resales = useSelector((store) => store.resales)
    console.log(resales);

    useEffect(() => {
        dispatch(api.getResales())
    }, [])

    return (
        <>
            <Header background='#F8FAFC'/>
            <section className="resale">
                <div className="container">
                    <div className="resale__inner">
                        <div className="resale__switch">
                            <button className='switch__btn' onClick={() => setIsCard(true)}>
                                <img src={require("./img/cards_icon.png")} />
                            </button>
                            <button className='switch__btn' onClick={() => setIsCard(false)}>
                                <img src={require("./img/list_icon.png")} />
                            </button>
                        </div>
                        <div>
                            <button className="resale__create-new">
                                Создать объявление
                            </button>
                        </div>
                    </div>
                    <div className="resale__products">
                        {isCard ?
                            resales.map(el => <ResaleCardItem
                                ad_image_path={el.ad_image_path}
                                product_type={el.ad_product_type}
                                ad_post_name={el.post_name}
                                ad_post_text={el.post_text}
                                ad_price={el.price} />) :
                            resales.map(el => <ResaleListItem />)
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Resale;