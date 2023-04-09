import { userUtils } from '../../utils/user.utils';
import './resaleCardItem.scss'

const ResaleCardItem = ({ ad_image_path, product_type, ad_post_name, ad_post_text, ad_price, other_props }) => {
    const photoURL = userUtils.getPhotoURL(ad_image_path, 'event_image')


    return (
        <>
            <div className="resale__card">
                <div className="resale__card-photo">
                    <img src={photoURL} alt='Фото товара' />
                </div>
                <div className='resale__card-inner'>
                    <div className="resale__card-type">
                        {product_type === null ? 'Что-то необычное' : product_type}

                        {' - '}

                        {product_type === 'Сноуборд' ? other_props.board_size + 'см' : null}
                        {product_type === 'Крепления' ? other_props.binding_size : null}
                        {product_type === 'Ботинки' ? other_props.shoe_size : null}
                        {product_type === 'Одежда' ? other_props.clothes_size : null}

                        {' - '}
                        
                        {product_type === 'Сноуборд' ? other_props.board_flex : null}
                        {product_type === 'Крепления' ? other_props.binding_flex : null}
                        {product_type === 'Ботинки' ? other_props.shoe_flex : null}
                        {product_type === 'Одежда' ? other_props.clothes_name : null}

                        {product_type === 'Сноуборд' ? ' - ' + other_props.board_deflection : null}
                    </div>
                    <div className="resale__card-name">
                        {ad_post_name}
                    </div>
                    <div className="resale__card-descr">
                        {ad_post_text?.length > 100 ? ad_post_text.slice(0, 97) + '...' : ad_post_text}
                    </div>
                    <div className='resale__card-price active'>
                        {ad_price} ₽
                    </div>
                    <div className='resale__card-show-btn'>
                        Показать
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResaleCardItem;