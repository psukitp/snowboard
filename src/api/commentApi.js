// const serverUrl = process.env.REACT_APP_SERVER_URL;
// const baseUrl = process.env.REACT_APP_BASE_URL;

// const addCommentToEvent = (comment_text, creator_id, event_id) => (dispatch, getState) => {
//     var myHeaders = new Headers();
//     var raw = { comment_text, creator_id, event_id };
//     myHeaders.append("Content-Type", "application/json");
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: JSON.stringify(raw),
//         redirect: 'follow',
//         mode: 'no-cors'
//     };
//     window.fetch(serverUrl + '/create-new-comment', requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));
//     dispatch({ type: 'ADD_COMMENT', payload: raw })
// }

// const getComments = (event_id) => (dispatch, getState) => {
//     window.fetch(serverUrl + `/comments/${'' + event_id}`)
//         .then(response => response.json())
//         .then(json => dispatch({ type: 'GET_COMMENTS', payload: json }));
// }

// const getCommentsStatistic = () => (dispatch, getState) => {
//     window.fetch(serverUrl + '/comment-statistic')
//         .then((response) => response.json())
//         .then((json) => {
//             dispatch({ type: 'GET_COMMENTS_STATISTIC', payload: json })
//         })
// }

// export const commentApi = {addCommentToEvent, getComments, getCommentsStatistic}

import $api from "./instance";

const addCommentToEvent = (comment_text, creator_id, event_id) => (dispatch, getState) => {
    var myHeaders = new Headers();
    var raw = { comment_text, creator_id, event_id };
    myHeaders.append("Content-Type", "application/json");
    $api.post('/create-new-comment', raw, { headers: myHeaders })
        .then(response => console.log(response))
        .catch(error => console.log('error', error));
    dispatch({ type: 'ADD_COMMENT', payload: raw })
}

const getComments = (event_id) => (dispatch, getState) => {
    $api.get(`/comments/${'' + event_id}`)
        .then(response => dispatch({ type: 'GET_COMMENTS', payload: response.data }))
        .catch(error => console.log('error', error));
}

const getCommentsStatistic = () => (dispatch, getState) => {
    $api.get('/comment-statistic')
        .then(response => dispatch({ type: 'GET_COMMENTS_STATISTIC', payload: response.data }))
        .catch(error => console.log('error', error));
}

export const commentApi = { addCommentToEvent, getComments, getCommentsStatistic };
