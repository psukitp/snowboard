import EventCard from './EventCard'
import './events.css'

let nextId = 0

//items будут браться из стора
//стор же в свою очередь будет данные брать с сервера. пока для демонстрации сделан просто массив объектов
const items = [{
    id: nextId++,
    name: '123',
    text: '123',
},
{
    id: nextId++,
    name: '123',
    text: '123',
}, {
    id: nextId++,
    name: '123',
    text: '123',
}, {
    id: nextId++,
    name: '123',
    text: '123',
}]

const Events = () => {
    return (
        <>
            <section className="events">
                <div className="container">
                    <div className="events__search">
                        <input className="events__search-input" placeholder='Найти мероприятие' />
                        <button className="create__event-btn">Созать мероприятие</button>
                    </div>
                    <div className="events__cards">
                        {items.map(el => <EventCard name={el.name} text={el.text} />)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Events;