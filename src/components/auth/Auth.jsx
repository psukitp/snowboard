import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { userApi } from '../../api/userApi';
import FooterLine from '../footer/FooterLine';
import RegAuthFooter from '../footer/RegAuthFooter';
import Header from '../header/Header'
import ErrorPopup from '../popup/ErrorPopup';
import './auth.css'

const Auth = () => {
    const dispatch = useDispatch();
    const userStatus = useSelector((store) => store.user)
    const [form, setForm] = useState({ login: '', password: '' })
    const navigate = useNavigate();

    useEffect(() => {
        if (userStatus.isAuth) {
            return navigate('/events')
        }
    }, [userStatus.isAuth])

    useEffect(() => {
        if (!userStatus.isWrong && userStatus.isWrong !== null) {
            navigate('/events')
        } else if (userStatus.isWrong !== null) {
            console.log(userStatus);
            showPopup('bad-mail')
        }
    }, [userStatus])

    const showPopup = (name) => {
        const popup = document.querySelector(`.popup__${name}`);
        popup.classList.add('active')
        setTimeout(() => popup.classList.remove('active'), 3 * 1000);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(userApi.login(form.login, form.password));
    }

    const handleChangeInput = (e) => {
        if (e.target.name === 'login') {
            setForm({ ...form, login: e.target.value })
        } else {
            setForm({ ...form, password: e.target.value })
        }
    }


    return (
        <>
            <Header bgColor='#F8FAFC' />
            <section className="auth">
                <div className="container">
                    <div className="auth__title">Вход</div>
                    <div className="auth__subtitle">Присоединяйтесь к обсуждению оборудования, советов, путешествий, делитесь фотографиями и многим другим!</div>
                    <div className='auth__inner'>
                        <form className="auth__form" onSubmit={handleSubmitForm}>
                            <input className="snowboard__input auth__input" name="login" type="email" onChange={handleChangeInput} placeholder='Почта' />
                            <input className="snowboard__input auth__input" name="password" type="password" onChange={handleChangeInput} placeholder='Пароль' />
                            <button className="snowboard__btn auth__btn-submit" type="submit">Войти</button>
                            <NavLink to='/registration' className="registration__link">
                                <span>Нет аккаунта?</span> Зарегистрироваться
                            </NavLink>
                        </form>
                        {userStatus.isWrong ? <div className='auth__wrong-data'> Неверные данные</div> : null}
                    </div>
                </div>
                <RegAuthFooter />
                <FooterLine />
                <ErrorPopup target='bad-mail' text={userStatus.message} />
            </section>
        </>
    )
}

export default Auth;