import { useSelector } from 'react-redux';
import './comment.css'

const Comment = (props) => {
    const userState = useSelector((store) => store.user)
    let newCommentDate = '';
    const getDateNow = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = String(today.getFullYear()).slice(2);
        return dd + '.' + mm + '.' + yyyy
    }

    const getDateFromString = (date) => {
        const yyyy = date.slice(2, 4);
        const dd = date.slice(5, 7);
        const mm = date.slice(8, 10);
        return dd + '.' + mm + '.' + yyyy
    }

    if (props.date) {
        newCommentDate = getDateFromString(props.date)
    } else {
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
                        {newCommentDate}
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