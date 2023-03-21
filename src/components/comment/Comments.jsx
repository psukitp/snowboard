import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import ErrorPopup from "../popup/ErrorPopup";
import Comment from "./Comment";
import './comments.css'


const Comments = ({ event_id }) => {
    const dispatch = useDispatch();
    const userState = useSelector((store) => store.user)
    const comments = useSelector((store) => store.comments)
    const [comment, setComment] = useState('');


    useEffect(() => {
        dispatch(api.getComments(event_id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const handleCommentSubmit = () => {
        if (comment !== '' && userState.isAuth) {
            dispatch(api.addCommentToEvent(comment, userState.id, event_id));
            setComment('');
        }
        if (!userState.isAuth) {
            const popup = document.querySelector('.popup__auth');
            popup.classList.add('active')
            setTimeout(() => popup.classList.remove('active'), 3 * 1000);
        }
    }
    return (
        <>
            <div className="comments">
                <div className="comments__title">
                    Комментарии
                </div>
                <div className="comments__list">
                    {comments?.length > 0 ?
                        comments?.sort((a, b) => parseFloat(a.comment_id) - parseFloat(b.comment_id)).map((el) => <Comment
                            key={el.comment_id}
                            login={el.login}
                            date={el.comment_date}
                            text={el.comment_text}
                            user_image_path={el.user_image_path} />)
                        : <div className="comments__list-plug">Кажется, комментариев нет. Ты можешь оставить первый!</div>}
                </div>
                <div className="comment__add">
                    <textarea className="snowboard__textarea" name="comment" value={comment} onChange={handleComment} placeholder='Комментарий...' />
                    <button className="snowboard__btn comment__add-btn" onClick={handleCommentSubmit}>Добавить</button>
                </div>
                <ErrorPopup target="auth" text='Хочешь оставить комментарий? Войди в аккаунт :)'/>
            </div>
        </>
    )
}

export default Comments;