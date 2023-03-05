import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
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
        if (!userState.isAuth){
            alert('Войдите, чтобы оставлять комментарии :)')
        }
    }
    return (
        <>
            <div className="comments">
                <div className="comments__title">
                    Комментарии
                </div>
                <div className="comments__list">
                    {comments.length > 0 ?
                        comments.map((el) => <Comment
                            key={el.comment_id}
                            name={el.name}
                            sname={el.s_name}
                            date={el.comment_date}
                            text={el.comment_text} />)
                        : <div className="comments__list-plug">Кажется, комментариев нет. Ты можешь оставить первый!</div>}
                </div>
                <div className="comment__add">
                    <textarea className="comment__add-textarea" name="comment" value={comment} onChange={handleComment} placeholder='Комментарий...' />
                    <button className="comment__add-btn" onClick={handleCommentSubmit}>Добавить</button>
                </div>
            </div>
        </>
    )
}

export default Comments;