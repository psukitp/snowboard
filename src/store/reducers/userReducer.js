

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTRATION = 'REGISTRATION';

const initialState = {
    login: '',
    name: '',
    status: '',
    user_image_path: '',
    id: '',
    email: '',
    isActivated: false,
    isAuth: false
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const { login, name,  id, email, isActivated, user_image_path } = action.payload;
            return {
                login,
                name,
                id,
                email,
                isActivated,
                user_image_path, 
                isAuth: true
            }
        case REGISTRATION:
            const user = action.payload;
            return {
                login: user.login,
                name: user.name,
                id: user.id,
                email: user.email,
                isActivated: user.isActivated,
                isAuth: true
            }
        case LOGOUT:
            return {
                id: '',
                email: '',
                isActivated: false,
                isAuth: false
            }
        default:
            return state;
    }
}

export default userReducer;