import { NavLink} from 'react-router-dom';
import './auth.css'

const Auth = () => {

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    return (
        <section className="auth">
            <div className="container">
                <div className="auth__title">Вход</div>
                <div className='auth__inner'>
                    <form className="auth__form" onSubmit={handleSubmitForm}>
                        <div className="auth__label">Логин</div>
                        <input className="auth__input" name="login" />
                        <div className="auth__label">Пароль</div>
                        <input className="auth__input" name="password" />
                        <button className="auth__btn-submit" type="submit">Войти</button>
                        <NavLink to='/registration' className="registration__link">Зарегистрироваться</NavLink>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Auth;