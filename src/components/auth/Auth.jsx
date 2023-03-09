import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { api } from '../../api/api';
import './auth.css'

const Auth = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ login: '', password: '' })

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(api.login(form.login, form.password));
    }

    const handleChangeInput = (e) => {
        if (e.target.name === 'login') {
            setForm({ ...form, login: e.target.value })
        } else {
            setForm({ ...form, password: e.target.value })
        }
    }


    return (
        <section className="auth">
            <div className="container">
                <div className="auth__title">Вход</div>
                <div className="auth__subtitle">Присоединяйтесь к обсуждению оборудования, советов, путешествий, делитесь фотографиями и многим другим!</div>
                <div className='auth__inner'>
                    <form className="auth__form" onSubmit={handleSubmitForm}>
                        <input className="auth__input" name="login" type="email" onChange={handleChangeInput} placeholder='Почта' />
                        <input className="auth__input" name="password" type="password" onChange={handleChangeInput} placeholder='Пароль' />
                        <button className="auth__btn-submit" type="submit">Войти</button>
                        <NavLink to='/registration' className="registration__link">
                            <span>Нет аккаунта?</span> Зарегистрироваться
                        </NavLink>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Auth;