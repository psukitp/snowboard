

const serverUrl = 'http://localhost:3001';
const baseUrl = 'http://localhost:3000';

const registration = (req) => (dispatch, getState) => {
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
    window.fetch(serverUrl + "/registration", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            localStorage.setItem('token', json.accessToken)
            dispatch({ type: 'REGISTRATION', payload: json.user })
            if (json.user) {
                window.location.replace(baseUrl + '/events');
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
            if (json.status === 400) {
                dispatch({ type: 'WRONG_DATA' })
            } else {
                localStorage.setItem('token', json.accessToken)
                dispatch({ type: 'LOGIN', payload: json.user })
            }
            if (json.user) {
                window.location.replace(baseUrl + '/events');
            }
        })

}

const checkAuth = () => (dispatch, getState) => {
    window.fetch(serverUrl + '/refresh', { credentials: 'include' })
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

    window.fetch(serverUrl + "/logout", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            localStorage.removeItem('token')
            dispatch({ type: 'LOGOUT' })
        })

}


const getEvents = () => (dispatch, getState) => {
    dispatch({ type: 'PENDING' })
    window.fetch(serverUrl + '/events')
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_EVENTS', payload: json });
            dispatch({ type: 'SUCCESS' })
        })

}

const createNewEvent = async (body) => {
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
    await fetch("http://localhost:3001/new-event", requestOptions)
}

const getOneEvent = (id) => async (dispatch, getState) => {
    await window.fetch(serverUrl + `/events/${id}`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_EVENT', payload: json });
        })

}

const updateEvent = (id, title, description) => (dispatch, getState) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ title, description }),
        redirect: 'follow',
        mode: 'cors',
        credentials: 'include'
    };

    window.fetch(serverUrl + `/events/update/${id}`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_EVENT', payload: json })
        })

}



const addCommentToEvent = (comment_text, creator_id, event_id) => (dispatch, getState) => {
    var myHeaders = new Headers();
    var raw = { comment_text, creator_id, event_id };
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow',
        mode: 'no-cors'
    };
    window.fetch(serverUrl + '/create-new-comment', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    dispatch({ type: 'ADD_COMMENT', payload: raw })
}

const getComments = (event_id) => (dispatch, getState) => {
    window.fetch(serverUrl + `/comments/${'' + event_id}`)
        .then(response => response.json())
        .then(json => dispatch({ type: 'GET_COMMENTS', payload: json }));
}




const getResales = () => (dispatch, getState) => {
    dispatch({ type: 'PENDING' })
    window.fetch(serverUrl + '/resales')
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_RESALE', payload: json });
            dispatch({ type: 'SUCCESS' })
        })

}

const createNewResale = async (form, properties) => {
    const raw = new FormData();
    raw.append("creator_id", form.creator_id);
    raw.append("resale_title", form.resale_title);
    raw.append("resale_description", form.resale_description);
    raw.append("resale_price", form.resale_price);
    raw.append("resale_type", form.resale_type);
    raw.append("resale_tel", form.resale_tel);
    raw.append("file", form.resale_image);
    switch (form.resale_type) {
        case 1:
            raw.append('length', properties.length)
            raw.append('deflection', properties.deflection)
            raw.append('flex', properties.flex)
            break
        case 3:
            raw.append('size', properties.size)
            raw.append('flex', properties.flex)
            break
        case 4:
            raw.append('size', properties.size)
            raw.append('flex', properties.flex)
            break
        case 5:
            raw.append('nameof', properties.nameof)
            raw.append('size', properties.size)
            break
        default:
            break
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "x-www-form-urlencoded");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };
    await fetch("http://localhost:3001/new-resale", requestOptions)
}

const getProductTypes = () => async (dispatch, getState) => {
    await fetch("http://localhost:3001/products")
        .then(response => response.json())
        .then((json) => dispatch({ type: 'GET_TYPES', payload: json }))
}

export const api = { getEvents, createNewEvent, login, checkAuth, logout, registration, getOneEvent, addCommentToEvent, getComments, updateEvent, getResales, createNewResale, getProductTypes }