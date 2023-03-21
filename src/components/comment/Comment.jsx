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

    let photoURL = ''
    if (props.user_image_path === null) {
        photoURL = `http://snowboard.na4u.ru/user_image/standard.png`
    } else {
        if (props.user_image_path) {
            photoURL = `http://snowboard.na4u.ru/${props.user_image_path}`;
        } else {
            photoURL = `http://snowboard.na4u.ru/${userState.user_image_path}`;
        }

    }

    console.log(photoURL)

    return (
        <>
            <div className="comment">
                <div className="comment__info">
                    <div className="comment__info-name">
                        <img src={photoURL} />
                        {props.login ? props.login : userState.login}
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