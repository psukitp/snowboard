import $api from "./instance";

const getResales = () => async (dispatch, getState) => {
    dispatch({ type: 'PENDING' });
    try {
        const response = await $api.get('/resales');
        dispatch({ type: 'GET_RESALES', payload: response.data });
        dispatch({ type: 'SUCCESS' });
    } catch (error) {
        console.log(error)
    }
}

const getOneResale = (id) => async (dispatch, getState) => {
    try {
        const response = await $api.get(`/resale/${id}`);
        dispatch({ type: 'GET_RESALE', payload: response.data });
    } catch (error) {
        console.log(error)
    }
}

const createNewResale = async (form, properties) => {
    const data = new FormData();
    data.append("creator_id", form.creator_id);
    data.append("resale_title", form.resale_title);
    data.append("resale_description", form.resale_description);
    data.append("resale_price", form.resale_price);
    data.append("resale_type", form.resale_type);
    data.append("resale_tel", form.resale_tel);
    data.append("file", form.resale_image);
    switch (form.resale_type) {
        case 1:
            data.append('length', properties.length)
            data.append('deflection', properties.deflection)
            data.append('flex', properties.flex)
            break
        case 3:
            data.append('size', properties.size)
            data.append('flex', properties.flex)
            break
        case 4:
            data.append('size', properties.size)
            data.append('flex', properties.flex)
            break
        case 5:
            data.append('nameof', properties.nameof)
            data.append('size', properties.size)
            break
        default:
            break
    }

    try {
        await $api.post( "/new-resale", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    } catch (error) {
        console.log(error)
    }
}

const getProductTypes = () => async (dispatch, getState) => {
    try {
        const response = await $api.get("/products");
        dispatch({ type: 'GET_TYPES', payload: response.data });
    } catch (error) {
        console.log(error)
    }
}

const updateResale = (id, body) => async (dispatch, getState) => {
    try {
        const response = await $api.post(`/resale/update/${id}`, body, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        dispatch({ type: 'UPDATE_RESALE', payload: response.data });
    } catch (error) {
        console.log(error)
    }
}

const getMyResales = (id) => async (dispatch, getState) => {
    try {
        const response = await $api.get(`/my-resales/${id}`);
        dispatch({ type: 'GET_MY_RESALES', payload: response.data });
    } catch (error) {
        console.log(error)
    }
}

export const resaleApi = { createNewResale, getResales, getProductTypes, updateResale, getOneResale, getMyResales };
