import $api from "./instance";

const getSenders = (id) => (dispatch, getState) => {
    var raw = {
        creator_id: id
    }
    return $api.post('/get-senders', raw)
        .then(response => response.data)
        .then(data => {
            dispatch({ type: "GET_SENDERS", payload: data })
        })
}

export const chatApi = { getSenders }