import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { api } from '../../api/api';
import RegAuthFooter from '../footer/RegAuthFooter';
import Header from '../header/Header';
import './registration.css'
import ErrorPopup from '../popup/ErrorPopup'

const Registration = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        login: '',
        email: '',
        name: '',
        password: '',
        passwordRepeat: ''
    })

    const checkEmpty = ({ login, email, name }) => {
        return !(login !== '' && email !== '' && name !== '')
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (checkEmpty(form)) {
            const popup = document.querySelector('.popup__bad-data');
            popup.classList.add('active')
            setTimeout(() => popup.classList.remove('active'), 3 * 1000);
        } else if (form.password === form.passwordRepeat && form.password.length < 6) {
            const popup = document.querySelector('.popup__bad-password');
            popup.classList.add('active')
            setTimeout(() => popup.classList.remove('active'), 3 * 1000);
        } else {
            dispatch(api.registration(form))
        }
    }

    const handleChangeInput = (e) => {
        if (e.target.name === 'login') {
            setForm({ ...form, login: e.target.value })
        } else if (e.target.name === 'email') {
            setForm({ ...form, email: e.target.value })
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
        <>
            <Header color='#fff' />
            <section className="reg">
                <div className="container">
                    <div className='reg__inner'>
                        <div className='reg__content'>
                            <div className='reg__content-title'>
                                Добро пожаловать в сообщество!
                            </div>
                            <div className='reg__content-subtitle'>
                                Зарегистрируйтесь сейчас, чтобы получать лучший контент для сноубордистов, специальные предложения и многое другое.
                            </div>
                            <div className='reg__content-quote'>
                                “Рассказываем про: Альпы, Розу Хутор, Домбай, Шерегеш, Хибины, Эльбрус, Кировск и другие места катания”🏂
                            </div>
                            <div className='reg__content-creator'>
                                <div className='reg__content-creator--photo'>
                                    <img src="" alt="" />
                                </div>
                                <div className='reg__content-creator--info'>
                                    <div className='reg__content-creator--name'>
                                        Даниил Мышкин
                                    </div>
                                    <div className='reg__content-creator--job'>
                                        Создатель
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form className="reg__form" onSubmit={handleSubmitForm}>
                            <div className="reg__form-title">Регистрация</div>
                            <div className='reg__form-subtitle'>Присоединяйтесь к обсуждению оборудования, мероприятий, делитесь фотографиями и многим другим!</div>
                            <div className="reg__form-name">
                                <div className="reg__label">Ваше имя</div>
                                <input className="reg__input" name="name" onChange={handleChangeInput} value={form.name} />
                            </div>
                            <div className="reg__form-email">
                                <div className="reg__label">Почта</div>
                                <input className="reg__input" name="email" onChange={handleChangeInput} value={form.mail} />
                            </div>
                            <div className="reg__form-login">
                                <div className="reg__label">Логин</div>
                                <input className="reg__input" name="login" onChange={handleChangeInput} value={form.login} />
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
                            <NavLink to='/auth' className="auth__link">
                                <span>Уже есть аккаунт?</span> Войти
                            </NavLink>
                        </form>
                    </div>
                    <RegAuthFooter />
                </div>
            </section>
            <ErrorPopup target='bad-data' text='Не все поля заполнены' />
            <ErrorPopup target='bad-password' text='Слишком короткий пароль' />
        </>
    )
}

export default Registration;