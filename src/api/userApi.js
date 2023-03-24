const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

const registration = (req) => async (dispatch, getState) => {
    var myHeaders = new Headers();
    var raw = JSON.stringify({
        login: req.login,
        name: req.name,
        email: req.email,
        password: req.password
    });
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'cors',
        credentials: 'include'
    };
    await window.fetch(serverUrl + "/registration", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if (json.code === 406) {
                dispatch({type: 'WRONG_DATA', payload: json})
            } else {
                localStorage.setItem('accessToken', json.accessToken)
                localStorage.setItem('refreshToken', json.refreshToken)
                dispatch({ type: 'REGISTRATION', payload: json.user })
            }
        })

}

const login = (email, password) => (dispatch, getState) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ email, password }),
        redirect: 'follow',
        mode: 'cors',
        credentials: 'include'
    };
    window.fetch(serverUrl + "/login", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            if (json.code === 400) {
                dispatch({ type: 'WRONG_DATA', payload: json})
            } else {
                localStorage.setItem('accessToken', json.accessToken)
                localStorage.setItem('refreshToken', json.refreshToken)
                dispatch({ type: 'LOGIN', payload: json.user })
            }
            if (json.user) {
                window.location.replace(baseUrl + '/events');
            }
        })

}

const checkAuth = () => (dispatch, getState) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ token: localStorage.getItem('accessToken') }),
        redirect: 'follow',
        mode: 'cors'
    };
    window.fetch(serverUrl + '/refresh', requestOptions)
        .then(response => response.json())
        .then(json => {
            localStorage.setItem('accessToken', json.accessToken)
            localStorage.setItem('refreshToken', json.refreshToken)
            dispatch({ type: 'LOGIN', payload: json.user })
        })
}

const logout = () => (dispatch, getState) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        mode: 'cors',
        credentials: 'include'
    };

    window.fetch(serverUrl + "/logout", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            dispatch({ type: 'LOGOUT' })
        })

}

const updateUser = (id, body) => (dispatch, getState) => {
    const { name, login, status } = body;
    const raw = JSON.stringify({ name, login, status })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'cors',
        credentials: 'include'
    };
    window.fetch(serverUrl + `/users/${id}`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            if (json.code === 406) {
                dispatch({ type: 'WRONG_DATA' })
            } else {
                dispatch({ type: 'UPDATE_USER', payload: json })
            }
        })
}


const updateUserPhoto = (id, photo) => (dispatch, getState) => {
    const raw = new FormData();
    raw.append("file", photo);


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "x-www-form-urlencoded");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors',
    };

    window.fetch(serverUrl + `/users/new-photo/${id}`, requestOptions)
}

export const userApi = { registration, login, checkAuth, updateUser, updateUserPhoto, logout }