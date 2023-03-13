const GET_TYPES = 'GET_TYPES';

const initialState = [];

const productTypesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TYPES:
            return action.payload;
        default:
            return state;
    }
}

export default productTypesReducer;