import './resaleCardItem.css'

const ResaleCardItem = ({ ad_image_path, product_type, ad_post_name, ad_post_text, ad_price }) => {

    let photoURL = ''
    if (ad_image_path === null) {
        photoURL = `http://localhost:3001/event_image/standard.jpeg`
    } else {
        photoURL = `http://localhost:3001${ad_image_path}`;
    }


    return (
        <>
            <div className="resale__card">
                <div className="resale__card-photo">
                    <img src={photoURL} />
                </div>
                <div className='resale__card-inner'>
                    <div className="resale__card-type">
                        {product_type === null ? 'Что-то необычное' : product_type}
                    </div>
                    <div className="resale__card-name">
                        {ad_post_name}
                    </div>
                    <div className="resale__card-descr">
                        {ad_post_text?.length > 100 ? ad_post_text.slice(0, 97) + '...': ad_post_text}
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