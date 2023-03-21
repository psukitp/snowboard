import './error.css'
import Header from '../header/Header'
const Error = () => {

    return (
        <>
        <Header />
            <section className="error">
                <div className="container">
                    <div className="error__image">
                        <img src={require("./img/404.png")} alt="404" />
                    </div>
                    <div className="error__message">
                        Такой страницы не найдено :(
                    </div>
                </div>
            </section>
        </>
    )
}

export default Error;