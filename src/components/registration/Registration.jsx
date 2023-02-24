import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './registration.css'

const Registration = () => {
    const [form, setForm] = useState({
        login: '',
        mail: '',
        name: '',
        sname: '',
        photoPath: '',
        password: '',
        passwordRepeat: ''
    })

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (form.password === form.passwordRepeat) {
            console.log(form);
        }
    }

    const handleChangeInput = (e) => {
        if (e.target.name === 'login') {
            setForm({ ...form, login: e.target.value })
        } else if (e.target.name === 'email') {
            setForm({ ...form, mail: e.target.value })
        } else if (e.target.name === 'name') {
            setForm({ ...form, name: e.target.value })
        } else if (e.target.name === 'second__name') {
            setForm({ ...form, sname: e.target.value })
        } else if (e.target.name === 'password') {
            setForm({ ...form, password: e.target.value })
        } else if (e.target.name === 'password__repeat') {
            setForm({ ...form, passwordRepeat: e.target.value })
        }
    }

    return (
        <section className="reg">
            <div className="container">
                <div className="reg__title">Регистрация</div>
                <div className='reg__inner'>
                    <form className="reg__form" onSubmit={handleSubmitForm}>
                        <div className="reg__form-login">
                            <div className="reg__label">Логин</div>
                            <input className="reg__input" name="login" onChange={handleChangeInput} value={form.login} />
                        </div>
                        <div className="reg__form-email">
                            <div className="reg__label">Почта</div>
                            <input className="reg__input" name="email" onChange={handleChangeInput} value={form.mail} />
                        </div>
                        <div className="reg__form-name">
                            <div className="reg__label">Имя</div>
                            <input className="reg__input" name="name" onChange={handleChangeInput} value={form.name} />
                        </div>
                        <div className="reg__form-second-name">
                            <div className="reg__label">Фамилия</div>
                            <input className="reg__input" name="second__name" onChange={handleChangeInput} value={form.sname} />
                        </div>
                        <div className="reg__form-photo">
                            <div className="reg__label">Фото профиля</div>
                            <button className="reg__btn-send-photo" type="button">Загрузить фото</button>
                        </div>
                        <div className="reg__form-password">
                            <div className="reg__label">Пароль</div>
                            <input className="reg__input" name="password" type="password" onChange={handleChangeInput} value={form.password} />
                        </div>
                        <div className="reg__form-password--repeat">
                            <div className="reg__label">Повторите пароль</div>
                            <input className="reg__input" name="password__repeat" type="password" onChange={handleChangeInput} value={form.passwordRepeat}
                            />
                            {form.password !== form.passwordRepeat ?
                                <div className='reg__wrong-password'>Пароли не совпадают!</div> :
                                null
                            }
                        </div>
                        <button className="reg__btn-submit" type="submit">Зарегистрироваться</button>
                        <NavLink to='/auth' className="auth__link">У меня уже есть аккаунт</NavLink>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Registration;