import { useSelector } from 'react-redux';
import './comment.scss'
import { userUtils } from '../../utils/user.utils';

const Comment = (props) => {
    const userState = useSelector((store) => store.user)
    const photoURL = userUtils.getPhotoURL(props.user_image_path, 'user_image')

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
                    {!props.status ?
                        (!userState.status ?
                            'Райдер без статуса, постоянно катается' :
                            userState.status) :
                        (props.status === 'null' ?
                            'Райдер без статуса, постоянно катается' :
                            props.status)}
                </div>
            </div>
        </>
    )
}

export default Comment;