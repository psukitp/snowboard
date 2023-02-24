import './eventCard.css'

const EventCard = ({name, text}) => {
    return (
        <>
            <div className="card">
                <div className="card-name">
                    {name}
                </div>
                <div className="card__photo">Фото</div>
                <div className="card-descr">
                    {text}
                </div>
                <button className='card__open-btn'>Открыть</button>
            </div>
        </>
    )
}

export default EventCard;