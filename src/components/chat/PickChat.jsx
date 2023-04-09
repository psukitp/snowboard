import { userUtils } from '../../utils/user.utils';
import './pickChat.scss'

const PickChat = (props) => {
    let photoURL = userUtils.getPhotoURL(props.user_image_path, 'user_image')
    return (
        <>
            <div className="pick" style={{background: props.bgc}}>
                <div className="pick__img">
                    <img src={photoURL} alt="" />
                </div>
                <div className="pick__name">
                    {props.login}
                </div>
            </div>
        </>
    )
}

export default PickChat;