import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import './chat.scss'
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { chatApi } from "../../api/chatApi";
import PickChat from "./PickChat";


const socket = io(process.env.REACT_APP_SERVER_URL)

const MyChat = (props) => {
    const dispatch = useDispatch()
    const senders = useSelector((store) => store.senders)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [emojiOpen, setEmojiOpen] = useState(false)
    const { user, creator } = props;
    const [chatSelectedNumber, setChatSelectedNumber] = useState(-1);
    const [chatSelectedLogin, setChatSelectedLogin] = useState(null);
    const allMessages = []

    useEffect(() => {
        dispatch(chatApi.getSenders(creator));
    }, [])

    useEffect(() => {
        setMessages([])
        const user = chatSelectedNumber;
        if (chatSelectedNumber > 0) {
            socket.emit('join', { user, creator })
            socket.on("message", ({ data }) => {
                if (!(JSON.stringify(allMessages).includes(JSON.stringify(data)))) {
                    setMessages((prevState) => [...prevState, data])
                }
                allMessages.push(data);
            })
        }

        return () => {
            socket.off('message')
        }
    }, [chatSelectedNumber])


    useEffect(() => {
        const chat = document.querySelector('.messages');
        chat.scrollTo(0, chat.scrollHeight)
    }, [messages])


    const handleChangeMessage = ({ target }) => {
        setMessage(target.value)
    }

    const onEmojiClick = ({ emoji }) => {
        setMessage(`${message}${emoji}`)
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault();

        if (!message) return;
        if (chatSelectedNumber < 0) return;
        const recipient = chatSelectedNumber;
        socket.emit('sendMessage', { message, user, creator, recipient });
        setMessage('')
    }

    const pickChat = (picked_chat, login) => {
        setChatSelectedNumber(picked_chat)
        setChatSelectedLogin(login)
    }

    return (
        <>
            <div className="chat">
                <div className="chat_inner">
                    <div className="chat__picker">
                        {senders.map(el => el.user_id > 0 ? <div onClick={() => pickChat(el.user_id, el.login)}>
                            <PickChat
                                user_id={el.user_id}
                                login={el.login}
                                user_image_path={el.user_image_path}
                                bgc={el.login === chatSelectedLogin ? 'grey' : '#fff'} />
                        </div> : null)}
                    </div>
                    <div className="chat__func">
                        <div className="title">{chatSelectedLogin ? chatSelectedLogin : 'Выбери диалог'}</div>
                        <div className="messages">
                            {messages.map(m => <Message currentUser={creator} user={m.user} message={m.message} />)}
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
                </div>
            </div>
        </>
    )
}


export default MyChat;
