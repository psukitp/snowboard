

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTRATION = 'REGISTRATION';

const initialState = {
    name: '',
    sname: '',
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
            const { name, s_name, id, email, isActivated } = action.payload;
            return {
                name,
                s_name,
                id,
                email,
                isActivated,
                isAuth: true
            }
        case REGISTRATION:
            const user = action.payload;
            return {
                name: user.name,
                sname: user.sname,
                id: user.ud,
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