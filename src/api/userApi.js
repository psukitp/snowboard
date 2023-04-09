import axios from "axios";
import $api from "./instance";


const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;


const registration = (req) => async (dispatch, getState) => {
    var raw = {
        login: req.login,
        name: req.name,
        email: req.email,
        password: req.password
    };
    return $api.post('/registration', raw)
        .then(response => response.data)
        .then(data => {
            if (data.code === 406 || data.code === 400) {
                dispatch({ type: 'WRONG_DATA', payload: data })
            } else {
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
                dispatch({ type: 'REGISTRATION', payload: data.user })
            }
        })
}



const login = (email, password) => async (dispatch, getState) => {
    return $api.post('/login', { email, password })
        .then(response => response.data)
        .then(data => {
            if (data.code === 400) {
                dispatch({ type: 'WRONG_DATA', payload: data })
            } else {
                localStorage.setItem('accessToken', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
                dispatch({ type: 'LOGIN', payload: data.user })
            }
        })
}

const checkAuth = () => async (dispatch, getState) => {
    await axios.post(`${serverUrl}/refresh`, { token: localStorage.getItem('refreshToken') })
        .then(response => response.data)
        .then(data => {
            localStorage.setItem('refreshToken', data.refreshToken)
            dispatch({ type: 'LOGIN', payload: data.user })
        })

}

const logout = () => (dispatch, getState) => {
    return $api.post('/logout')
        .then(response => response.data)
        .then(data => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            dispatch({ type: 'LOGOUT' })
        })

}

const updateUser = (id, body) => (dispatch, getState) => {
    const { name, login, status } = body;
   
    return $api.post(`/users/${id}`, { name, login, status })
        .then(response => response.data)
        .then(data => {
            if (data.code === 406) {
                dispatch({ type: 'WRONG_DATA', payload: data })
            } else {
                dispatch({ type: 'UPDATE_USER', payload: data })
            }
        })
}


const updateUserPhoto = (id, photo) => (dispatch, getState) => {
    const formData = new FormData();
    formData.append("file", photo);

    const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    };

    $api.post(`/users/new-photo/${id}`, formData, config)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export const userApi = { registration, login, checkAuth, updateUser, updateUserPhoto, logout }