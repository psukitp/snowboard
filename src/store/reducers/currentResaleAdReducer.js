const GET_RESALE = 'GET_RESALE';
const UPDATE_RESALE = 'UPDATE_RESALE';

const initialState = [{}];

const currentResaleAdReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESALE:
            return action.payload;
        case UPDATE_RESALE:
            const { login, post_text, post_name, price, ad_telephone } = action.payload;
            return { ...state, login, post_text, post_name, price, ad_telephone }
        default:
            return state
    }
}

export default currentResaleAdReducer