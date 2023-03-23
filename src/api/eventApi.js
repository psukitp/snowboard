const serverUrl = process.env.REACT_APP_SERVER_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

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
    await fetch(serverUrl + "/new-event", requestOptions)
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

const deleteEvent = (id) => (dispatch, getState) => {
    window.fetch(serverUrl + `/events/delete/${id}`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_EVENT', payload: json })
        })

}

const getEventsStatistic = () => (dispatch, getState) => {
    window.fetch(serverUrl + '/events-statistic')
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_EVENTS_STATISTIC', payload: json })
        })
}

export const eventApi = {getEvents, getOneEvent, updateEvent, deleteEvent, getEventsStatistic, createNewEvent}
