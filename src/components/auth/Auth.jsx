import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css'

const Auth = () => {
    const [form, setForm] = useState({ login: '', password: '' })

    const handleSubmitForm = (e) => {
        e.preventDefault();
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
                <div className='auth__inner'>
                    <form className="auth__form" onSubmit={handleSubmitForm}>
                        <div className="auth__label">Логин</div>
                        <input className="auth__input" name="login" onChange={handleChangeInput} />
                        <div className="auth__label">Пароль</div>
                        <input className="auth__input" name="password" onChange={handleChangeInput} />
                        <button className="auth__btn-submit" type="submit">Войти</button>
                        <NavLink to='/registration' className="registration__link">Зарегистрироваться</NavLink>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Auth;