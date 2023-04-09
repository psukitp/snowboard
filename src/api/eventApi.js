import $api from './instance';

const getEvents = () => (dispatch, getState) => {
    dispatch({ type: 'PENDING' });
    $api.get(`/events`)
        .then((response) => {
            dispatch({ type: 'GET_EVENTS', payload: response.data });
            dispatch({ type: 'SUCCESS' });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: error });
        });
};

const createNewEvent = async (body) => {
    const formData = new FormData();
    formData.append('creator_id', body.creator_id);
    formData.append('event_title', body.event_title);
    formData.append('event_date', body.event_date);
    formData.append('event_description', body.event_description);
    formData.append('file', body.event_image);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    await $api.post(`/new-event`, formData, config);
};

const getOneEvent = (id) => async (dispatch, getState) => {
    await $api.get(`/events/${id}`)
        .then((response) => {
            dispatch({ type: 'GET_EVENT', payload: response.data });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: error });
        });
};

const updateEvent = (id, title, description) => (dispatch, getState) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };
    const data = JSON.stringify({ title, description });
    $api.post(`/events/update/${id}`, data, config)
        .then((response) => {
            dispatch({ type: 'GET_EVENT', payload: response.data });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: error });
        });
};

const deleteEvent = (id) => async (dispatch, getState) => {
    await $api.get(`/events/delete/${id}`)
        .then((response) => {
            dispatch({ type: 'GET_EVENT', payload: response.data });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: error });
        });
};

const getEventsStatistic = () => (dispatch, getState) => {
    $api.get(`/events-statistic`)
        .then((response) => {
            dispatch({ type: 'GET_EVENTS_STATISTIC', payload: response.data });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: error });
        });
};

const getMyEvents = (id) => (dispatch, getState) => {
    $api.get(`/my-events/${id}`)
        .then((response) => {
            dispatch({ type: 'GET_MY_EVENTS', payload: response.data });
        })
        .catch((error) => {
            dispatch({ type: 'ERROR', payload: error });
        });
};

export const eventApi = {
    getEvents,
    getOneEvent,
    updateEvent,
    deleteEvent,
    getEventsStatistic,
    createNewEvent,
    getMyEvents,
};
