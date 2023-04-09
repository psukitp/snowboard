const GET_MESSAGE_HISTORY = 'GET_MESSAGE_HISTORY';
const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE';


const initialState = [{}];


const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGE_HISTORY:
            return action.payload;
        case SET_NEW_MESSAGE:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default messagesReducer;