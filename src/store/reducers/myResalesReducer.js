
const GET_MY_RESALES = 'GET_MY_RESALES';

const initialState = [{}];

const myResalesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MY_RESALES:
            return action.payload;
        default:
            return state
    }
}

export default myResalesReducer