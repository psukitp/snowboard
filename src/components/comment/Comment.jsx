import { useSelector } from 'react-redux';
import './comment.css'

const Comment = (props) => {
    const userState = useSelector((store) => store.user)

    let newCommentDate = '';
    const getDateNow = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = String(today.getFullYear());
        return dd + '.' + mm + '.' + yyyy
    }

    if (!props.date) {
        newCommentDate = getDateNow();
    }
    return (
        <>
            <div className="comment">
                <div className="comment__info">
                    <div className="comment__info-name">
                        {!props.name ? userState.name : props.name} {!props.sname ? userState.s_name : props.sname}
                    </div>
                    <div className="comment__info-date">
                        {props.date ? props.date : newCommentDate}
                    </div>
                </div>
                <div className="comment__text">
                    {props.text}
                </div>
            </div>
        </>
    )
}

export default Comment;