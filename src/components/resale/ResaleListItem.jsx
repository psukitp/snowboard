import './resaleListItem.css'

const ResaleListItem = ({ ad_image_path, product_type, ad_post_name, ad_post_text, ad_price }) => {
    let photoURL = ''
    if (ad_image_path === null) {
        photoURL = `http://localhost:3001/event_image/standard.jpeg`
    } else {
        photoURL = `http://localhost:3001${ad_image_path}`;
    }


    return (
        <>
            <div className="resale__item">
                <div className="resale__item-photo">
                    <img src={photoURL} />
                </div>
                <div className='resale__item-inner'>
                    <div className="resale__item-type">
                        {product_type === null ? 'Что-то необычное' : product_type}
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