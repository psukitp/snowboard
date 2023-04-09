const GET_SENDERS = 'GET_SENDERS';



const initialState = [{}];

const sendersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SENDERS:
            return action.payload;
        default:
            return state;
    }
}

export default sendersReducer;