const GET_RESALES = 'GET_RESALES';


const initialState = [{}];

const resaleReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESALES:
            return action.payload
        default:
            return state;
    }
}


export default resaleReducer;