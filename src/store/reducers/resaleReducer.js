const GET_RESALE = 'GET_RESALE';


const initialState = [{}];

const resaleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESALE:
            return action.payload
        default:
            return state;
    }
}


export default resaleReducer;