
const url = 'http://localhost:3001'


const getEvents = () => (dispatch, getState) => {
    window.fetch(url + '/events')
        .then((response) => response.json())
        .then((json) => dispatch({ type: 'GET_EVENTS', payload: json }))
}

const createNewEvent = (body) => {
    var raw = JSON.stringify(body);
    console.log(raw)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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


export const api = { getEvents, createNewEvent }