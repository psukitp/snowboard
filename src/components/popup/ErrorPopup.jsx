import './errorPopup.css'


const ErrorPopup = (props) => {
    return (
        <div className="popup">
            <img src={require("./img/popup.png")} alt="Ошибка" />
            <div className="popup__text">{props.text}</div>
        </div>
    )
}

export default ErrorPopup;