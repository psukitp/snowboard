import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegAuthFooter from "../footer/RegAuthFooter";
import Header from "../header/Header";
import './profile.scss'
import ErrorPopup from "../popup/ErrorPopup";
import { userApi } from "../../api/userApi";
import { popupUtils } from "../../utils/popup.utils";
import { userUtils } from "../../utils/user.utils";

const Profile = () => {
    const userStatus = useSelector((store) => store.user)
    const { user_image_path } = userStatus;
    const [form, setForm] = useState({ name: '', login: '', status: '' })
    const dispatch = useDispatch();
    const photoURL = userUtils(user_image_path, 'user_image')

    useEffect(() => {
        if (userStatus.isWrong && userStatus !== null) {
            popupUtils.showPopup('login_exist')
        }
    }, [userStatus])

    const handleChangeInput = ({ target }) => {
        if (target.name === 'name') {
            setForm({ ...form, name: target.value })
        } else if (target.name === 'login') {
            if (target.value.slice(-1).charCodeAt(0) > 122) {
                popupUtils.showPopup('bad_symbol_login', 2)
            } else {
                setForm({ ...form, login: target.value })
            }
        } else {
            setForm({ ...form, status: target.value })
        }
    }

    const handleFileUpload = async ({ target }) => {
        const currentFile = target.files[0];
        if (!["image/jpeg", "image/png", "image/gif", "image/svg+xml"].includes(currentFile.type)) {
            popupUtils.showPopup('files')
        }
        else {
            await dispatch(userApi.updateUserPhoto(userStatus.id, currentFile));
            window.location.reload();
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (form.login.length < 5 && form.login.length !== 0) {
            popupUtils.showPopup('short_login', 2)
        } else {
            await dispatch(userApi.updateUser(userStatus.id, form))
            setForm({ name: '', login: '', status: '' })
        }
    }


    return (
        <>
            <div className="wrapper">
                <Header />
                <div className="main profile__main">
                    <section className="profile">
                        <div className="profile__inner">
                            <div className="profile__info">
                                <div className="profile__photo">
                                    <img src={photoURL} />
                                </div>
                                <div className="profile__name">
                                    <div className="name">
                                        {'Имя: ' + userStatus.name}
                                    </div>
                                    <div className="login">
                                        {'Логин: ' + userStatus.login}
                                    </div>
                                </div>
                                <div className="profile__status">
                                    {userStatus.status === undefined ? 'У тебя пока что нет статуса :(' : 'Статус: ' + userStatus.status}
                                </div>
                            </div>
                            <div className="profile__edit-photo">
                                <input type="file" name="file" id="file" className="snowboard__input input__file" onChange={handleFileUpload} />
                                <label htmlFor="file" className="snowboard__btn profile__edit__btn-send-photo">
                                    <span className="input__file-text">Изменить фото</span>
                                    <img src={require('./img/download_icon.png')} alt='Загрузить' />
                                </label>
                            </div>
                            <form className="profile__edit" onSubmit={handleFormSubmit}>
                                <div className="profile__edit__label">Имя</div>
                                <input className="snowboard__input profile__edit__input" name='name' onChange={handleChangeInput} value={form.name} />
                                <div className="profile__edit__label">Логин</div>
                                <input className="snowboard__input profile__edit__input" name='login' onChange={handleChangeInput} value={form.login} />
                                <div className="profile__edit__label">Статус</div>
                                <input className="snowboard__input profile__edit__input" name='status' onChange={handleChangeInput} value={form.status} />
                                <button type="submit" className="snowboard__btn profile__edit-btn">Сохранить</button>
                            </form>
                        </div>
                    </section>
                </div>
                <RegAuthFooter />
            </div>
            <ErrorPopup target="login_exist" text={userStatus.message} />
            <ErrorPopup target="bad_symbol_login" text='Разрешены только латинские символы' />
            <ErrorPopup target="files" text='Разрешены только изображения' />
            <ErrorPopup target="short_login" text='Логин не может быть меньше 5 символов' />
        </>
    )
}

export default Profile;