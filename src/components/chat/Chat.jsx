import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import './chat.scss'
import Message from "./Message";
import $api from "../../api/instance";


const socket = io(process.env.REACT_APP_SERVER_URL)

const Chat = (props) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const { user, creator } = props;

    useEffect(() => {
        setMessages([])
        socket.emit('join', { user, creator })
        socket.on("message", ({ data }) => {
            setMessages((prevState) => [...prevState, data])
        })
        let raw = {
            creator,
            user
        }
        $api.post('/get-history', raw)
            .then(response => response.data)
            .then(data => {
                setMessages(data)
            })



        return () => {
            socket.off('message')
        }

    }, [])

    useEffect(() => {
        const chat = document.querySelector('.messages');
        chat.scrollTo(0, chat.scrollHeight)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages])


    const handleChangeMessage = ({ target }) => {
        setMessage(target.value)
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();

        if (!message) return;
        const recipient = user;
        socket.emit('sendMessage', { message, user, creator, recipient });
        setMessage('')
    }

    return (
        <>
            <div className="chat">
                <div className="title">{props.creator_login}</div>
                <div className="messages">
                    {messages.map(m => <Message currentUser={user} user={m.user} message={m.message} />)}
                </div>
                <form onSubmit={handleMessageSubmit} className="chat__form">
                    <input
                        type="text"
                        name="message"
                        placeholder="Твое сообщение"
                        value={message}
                        onChange={handleChangeMessage}
                        autoComplete="off"
                        className="chat__input" />
                    <button type="submit" className="chat__btn">
                        <img src={require('./img/send-btn.png')} />
                    </button>
                </form>
            </div>
        </>
    )
}


export default Chat;
