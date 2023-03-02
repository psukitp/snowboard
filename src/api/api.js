
const url = 'http://localhost:3001'

const registration = (req) => (dispatch, getState) => {
    var myHeaders = new Headers();
    var raw =JSON.stringify({
        name: req.name,
        sname: req.sname,
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
    window.fetch("http://localhost:3001/registration", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem('token', json.accessToken)
            dispatch({ type: 'REGISTRATION', payload: json.user })
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

    window.fetch("http://localhost:3001/login", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem('token', json.accessToken)
            dispatch({ type: 'LOGIN', payload: json.user })
        })

}

const checkAuth = () => (dispatch, getState) => {
    window.fetch(url + '/refresh', { credentials: 'include' })
        .then(response => response.json())
        .then(json => {
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

    window.fetch("http://localhost:3001/logout", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            localStorage.removeItem('token')
            dispatch({ type: 'LOGOUT' })
        })

}


const getEvents = () => (dispatch, getState) => {
    window.fetch(url + '/events')
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_EVENTS', payload: json });
        })

}

const createNewEvent = (body) => {
    const raw = new FormData();
    raw.append("creator_id", body.creator_id);
    raw.append("event_title", body.event_title);
    raw.append("event_date", body.event_date);
    raw.append("event_description", body.event_description);
    raw.append("file", body.event_image);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "x-www-form-urlencoded");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };
    fetch("http://localhost:3001/new-event", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


export const api = { getEvents, createNewEvent, login, checkAuth, logout, registration }