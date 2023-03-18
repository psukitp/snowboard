

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTRATION = 'REGISTRATION';
const WRONG_DATA = 'WRONG_DATA';
const UPDATE_USER = 'UPDATE_USER';

const initialState = {
    login: '',
    name: '',
    status: '',
    user_image_path: '',
    id: '',
    email: '',
    isActivated: false,
    isAuth: false,
    isWrong: false
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const { login, name, id, email, isActivated, user_image_path, status} = action.payload;
            return {
                login,
                name,
                status,
                id,
                email,
                isActivated,
                user_image_path,
                isAuth: true,
                isWrong: false
            }
        case REGISTRATION:
            const user = action.payload;
            return {
                login: user.login,
                name: user.name,
                id: user.id,
                email: user.email,
                isActivated: user.isActivated,
                isAuth: true,
                isWrong: false
            }
        case LOGOUT:
            return {
                id: '',
                email: '',
                isActivated: false,
                isAuth: false,
                isWrong: false
            }
        case UPDATE_USER:
            const updatedUser = action.payload;
            console.log(action.payload)
            return {
                ...state, 
                name: updatedUser.name,
                login: updatedUser.login,
                status: updatedUser.status, 
                user_image_path: updatedUser.user_image_path,
                isWrong: false
            }
        case WRONG_DATA:
            return {
                ...state,
                isWrong: true
            }
        default:
            return state;
    }
}

export default userReducer;