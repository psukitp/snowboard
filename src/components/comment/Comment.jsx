import { useSelector } from 'react-redux';
import './comment.scss'

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

    let photoURL = ''
    if (props.user_image_path === null) {
        photoURL = `${process.env.REACT_APP_SERVER_URL}/user_image/standard.png`
    } else {
        photoURL = `${process.env.REACT_APP_SERVER_URL}/${props.user_image_path}`;
    }

    let status = '';
    if (props.status) {
        props.status !== 'null' ? status = props.status : status = 'Райдер без статуса, все время катается'
    } else {
        status = userState.status;
    }

    if (!props.date) {
        newCommentDate = getDateNow();
    }
    return (
        <>
            <div className="comment">
                <div className="comment__info">
                    <div className="comment__info-photo">
                        <img src={props.user_image_path ? photoURL : `${process.env.REACT_APP_SERVER_URL}/${userState.user_image_path}`} alt='Аватарка' />
                    </div>
                    <div className="comment__info-name">
                        {!props.login ? userState.login : props.login}
                    </div>
                    <div className="comment__info-date">
                        {props.date ? props.date : newCommentDate}
                    </div>
                </div>
                <div className="comment__text">
                    {props.text}
                </div>
                <hr />
                <div className='comment__user-status'>
                    {status}
                </div>
            </div>
        </>
    )
}

export default Comment;