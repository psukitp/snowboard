import './resaleListItem.scss'

const ResaleListItem = ({ ad_image_path, product_type, ad_post_name, ad_post_text, ad_price, other_props }) => {
    let photoURL = ''
    if (ad_image_path === null) {
        photoURL = `${process.env.REACT_APP_SERVER_URL}/event_image/standard.png`
    } else {
        photoURL = `${process.env.REACT_APP_SERVER_URL}/${ad_image_path}`;
    }


    return (
        <>
            <div className="resale__item">
                <div className="resale__item-photo">
                    <img src={photoURL} alt='Фото товара' />
                </div>
                <div className='resale__item-inner'>
                    <div className="resale__item-type">
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
                    <div className="resale__item-name">
                        {ad_post_name}
                    </div>
                    <div className="resale__item-descr">
                        {ad_post_text?.length > 250 ? ad_post_text.slice(0, 247) + '...' : ad_post_text}
                    </div>
                    <div className='resale__item-price'>
                        {ad_price} ₽
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResaleListItem;