import './Message.scss'

const Message = ({ currentUser, user, message }) => {
    if (currentUser === user) {
        return (
            <>
                <div className="my-message">
                    <div className="my-message__text">
                        {message}
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="message">
                <div className="message__text">
                    {message}
                </div>
            </div>
        </>
    )

}

export default Message;