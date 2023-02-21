import { NavLink } from 'react-router-dom';
import './registration.css'

const Registration = () => {
    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    return (
        <section className="reg">
            <div className="container">
                <div className="reg__title">Регистрация</div>
                <div className='reg__inner'>
                    <form className="reg__form" onSubmit={handleSubmitForm}>
                        <div className="reg__form-login">
                            <div className="reg__label">Логин</div>
                            <input className="reg__input" name="login" />
                        </div>
                        <div className="reg__form-email">
                            <div className="reg__label">Почта</div>
                            <input className="reg__input" name="email" />
                        </div>
                        <div className="reg__form-name">
                            <div className="reg__label">Имя</div>
                            <input className="reg__input" name="name" />
                        </div>
                        <div className="reg__form-second-name">
                            <div className="reg__label">Фамилия</div>
                            <input className="reg__input" name="second__name" />
                        </div>
                        <div className="reg__form-photo">
                            <div className="reg__label">Фото профиля</div>
                            <button className="reg__btn-send-photo" type="button">Загрузить фото</button>
                        </div>
                        <div className="reg__form-password">
                            <div className="reg__label">Пароль</div>
                            <input className="reg__input" name="password" type="password" />
                        </div>
                        <div className="reg__form-password--repeat">
                            <div className="reg__label">Повторите пароль</div>
                            <input className="reg__input" name="password" type="password"/>
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