import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './header.scss';
import Toolbar from './Toolbar';
import { userUtils } from '../../utils/user.utils';
import { useRef, useState } from 'react';


const Header = ({ textColor, bgColor, isReg }) => {
    const userStatus = useSelector((store) => store.user)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLog = userStatus.isAuth;
    const { user_image_path } = userStatus;
    const photoURL = userUtils.getPhotoURL(user_image_path, 'user_image')
    const menu = useRef()
    const auth = useRef()

    const handleOpenMenu = () => {
        menu.current.classList.toggle('active')
        if (!userStatus.isAuth) {
            auth.current.classList.toggle('active')
        }
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className='header' style={{ backgroundColor: bgColor }}>
            <div className='container'>
                <div className='header__inner'>
                    <div className='header__inner-navigation'>
                        <NavLink to='/events'>
                            <svg width="53" height="38" viewBox="0 0 53 38" fill="none" xmlns="https://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_53_141)">
                                    <path d="M46.8021 25.532C46.1123 25.5148 45.3811 25.8484 44.758 25.5503C43.9406 25.1594 43.7233 23.8548 42.8288 23.7402C42.6897 24.5197 41.0411 23.3217 40.8031 22.8426C40.3432 21.9186 33.3417 16.6281 33.4452 15.3143L31.2735 18.045C31.1959 18.1483 31.108 18.2435 31.0113 18.3293C29.8961 17.2288 28.7856 16.1604 27.537 15.2203C27.7486 15.0621 27.9624 14.9062 28.1808 14.756C28.4395 14.5772 28.7327 14.3972 29.0442 14.4339C29.2581 14.4591 29.457 14.5864 29.6708 14.5715C30.1571 14.5382 30.7055 13.7243 31.0102 13.4056C31.5153 12.889 32.0196 12.3712 32.5232 11.8523C32.5802 11.7952 32.6487 11.7508 32.7242 11.7219C32.7997 11.693 32.8804 11.6803 32.9611 11.6846C33.0418 11.6889 33.1207 11.7102 33.1927 11.747C33.2646 11.7838 33.3279 11.8353 33.3785 11.8981C35.0651 14.0269 37.0092 15.8394 39.0809 17.5853C39.1959 17.677 39.32 17.7744 39.4614 17.7527C39.6626 17.7206 39.7431 17.4775 39.896 17.3434C40.0834 17.1795 40.3789 17.1967 40.5973 17.3159C40.8071 17.4504 40.9874 17.6259 41.1273 17.8318L44.1498 21.6985C44.2763 21.8601 44.4464 22.0424 44.6384 22.0562C45.0795 19.3587 44.9318 16.5982 44.2055 13.9629C43.4791 11.3276 42.1912 8.87952 40.4295 6.78577C38.6678 4.69201 36.4739 3.00184 33.9975 1.83058C31.5211 0.659311 28.8204 0.0345215 26.0797 -0.00115768C23.339 -0.0368369 20.6229 0.517433 18.1167 1.62383C15.6104 2.73023 13.373 4.36271 11.5571 6.40989C9.74124 8.45707 8.38963 10.8708 7.59451 13.4863C6.7994 16.1018 6.57949 18.8575 6.94979 21.5655C7.26021 21.4715 7.61316 21.5002 7.84884 21.7134C7.9776 21.828 8.07878 21.9988 8.24088 22.0458C8.48116 22.1123 8.70075 21.8945 8.85021 21.7019L11.875 17.8352C12.0153 17.6293 12.196 17.4538 12.4062 17.3193C12.6246 17.2047 12.9201 17.1829 13.1075 17.3468C13.2604 17.481 13.3374 17.724 13.542 17.7561C13.6834 17.7779 13.8134 17.6804 13.9226 17.5887C15.992 15.8428 17.9384 14.035 19.625 11.9016C19.6756 11.8387 19.7389 11.7872 19.8108 11.7504C19.8827 11.7136 19.9616 11.6924 20.0424 11.688C20.1231 11.6837 20.2038 11.6964 20.2793 11.7253C20.3547 11.7542 20.4232 11.7986 20.4803 11.8557L21.9933 13.4091C22.3037 13.7277 22.8463 14.5417 23.3327 14.5749C23.5465 14.5898 23.7454 14.4603 23.9581 14.4373C24.2708 14.4007 24.5628 14.5806 24.8215 14.7595C26.4184 15.8577 27.7693 17.1749 29.1408 18.5322C29.3225 18.711 29.5168 18.8979 29.7651 18.9552C30.0134 19.0125 30.2859 18.9265 30.5411 18.9736C30.7695 19.0283 30.9771 19.1478 31.139 19.3175C31.2884 19.4573 31.4252 19.6144 31.5643 19.7416C31.9391 20.0832 32.3101 20.4294 32.6772 20.7802C33.4843 21.5514 34.2806 22.3332 35.0662 23.1257C36.6375 24.7092 38.1673 26.3337 39.6557 27.999L32.1001 22.1983C31.8908 22.039 31.6735 21.9163 31.4103 22.0596C31.2708 22.1544 31.1369 22.257 31.009 22.3668C30.7126 22.5562 30.3557 22.6278 30.0088 22.5674C29.3478 22.4734 28.7373 22.0711 28.2188 21.6733L24.9376 19.1512C24.3754 18.7202 23.7247 18.2639 23.0245 18.3763C22.7659 18.4176 22.506 18.5356 22.2543 18.468C22.0301 18.4084 21.8714 18.2169 21.7277 18.037L19.5548 15.3063L19.879 19.5181C19.9327 20.2197 19.9867 20.9216 20.0411 21.624C20.0653 21.9312 20.0883 22.2373 20.1113 22.5411C20.1308 22.8001 20.0825 23.2071 20.1779 23.4467C19.7592 22.4485 19.267 21.4825 18.7052 20.5567C18.4232 20.0981 18.125 19.6465 17.8108 19.2017C17.5739 18.8692 17.2417 18.2341 16.891 18.0484C16.3725 18.828 16.023 19.8001 15.654 20.6587C15.2849 21.5174 14.9297 22.4196 14.6112 23.316L14.1111 20.5716C13.1914 21.084 12.6591 21.9071 12.1981 22.8311C11.9589 23.3103 11.1634 25.6477 11.3025 25.7715C10.7122 25.2319 10.3153 24.5144 10.1723 23.7287C9.27329 23.8433 9.0606 25.1479 8.24318 25.5388C7.62005 25.8369 6.89001 25.5033 6.19906 25.5205C5.08157 25.548 1.24396 29.0674 0.00115967 29.7529L5.87945 27.1529L8.54324 27.0062C10.0516 30.2442 12.4441 32.9932 15.4468 34.9381C18.4494 36.883 21.9408 37.9453 25.5209 38.0032C29.101 38.0611 32.625 37.1123 35.6894 35.2655C38.7537 33.4187 41.2344 30.7486 42.8472 27.561L44.597 27.7261L47.093 27.2802L53.0023 29.7644C51.7572 29.0788 47.9196 25.5595 46.8021 25.532Z" fill={isReg ? '#fff' : '#4482B9'} />
                                </g>
                                <defs>
                                    <clipPath id="clip0_53_141">
                                        <rect width="53" height="38" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </NavLink>
                        <nav>
                            <ul className='menu' ref={menu} style={{ backgroundColor: bgColor }}>
                                <li>
                                    <NavLink to="/events" style={{ color: textColor }}> Мероприятия</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/resale" style={{ color: textColor }}>Барахолка</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/statistic" style={{ color: textColor }}>Статистика</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {isLog ? <Toolbar name={userStatus.login} sname={userStatus.s_name} photoUrl={photoURL} /> :
                        <a href="/auth" className='auth__btn-link' ref={auth}>
                            <button className='snowboard__btn auth__btn'>
                                Войти
                            </button>
                        </a>}
                    <div className="menu__open">
                        <button onClick={handleOpenMenu}>
                            {isMenuOpen ?
                                <img src={require("./img/close_icon.png")} alt="Закрыть" style={{ marginRight: 11, marginLeft: 10 }} /> :
                                <img src={require("./img/open_icon.png")} alt="Открыть" />
                            }
                        </button>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header;