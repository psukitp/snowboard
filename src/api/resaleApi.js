const serverUrl = process.env.REACT_APP_SERVER_URL;

const getResales = () => (dispatch, getState) => {
    dispatch({ type: 'PENDING' })
    window.fetch(serverUrl + '/resales')
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_RESALES', payload: json });
            dispatch({ type: 'SUCCESS' })
        })

}

const getOneResale = (id) => async (dispatch, getState) => {
    await window.fetch(serverUrl + `/resale/${id}`)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'GET_RESALE', payload: json });
        })

}

const createNewResale = async (form, properties) => {
    const raw = new FormData();
    raw.append("creator_id", form.creator_id);
    raw.append("resale_title", form.resale_title);
    raw.append("resale_description", form.resale_description);
    raw.append("resale_price", form.resale_price);
    raw.append("resale_type", form.resale_type);
    raw.append("resale_tel", form.resale_tel);
    raw.append("file", form.resale_image);
    switch (form.resale_type) {
        case 1:
            raw.append('length', properties.length)
            raw.append('deflection', properties.deflection)
            raw.append('flex', properties.flex)
            break
        case 3:
            raw.append('size', properties.size)
            raw.append('flex', properties.flex)
            break
        case 4:
            raw.append('size', properties.size)
            raw.append('flex', properties.flex)
            break
        case 5:
            raw.append('nameof', properties.nameof)
            raw.append('size', properties.size)
            break
        default:
            break
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "x-www-form-urlencoded");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'no-cors'
    };
    await fetch(serverUrl + "/new-resale", requestOptions)
}

const getProductTypes = () => async (dispatch, getState) => {
    await fetch(serverUrl + "/products")
        .then(response => response.json())
        .then((json) => dispatch({ type: 'GET_TYPES', payload: json }))
}

const updateResale = (id, body) => (dispatch, getState) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow',
        mode: 'cors',
        credentials: 'include'
    };

    window.fetch(serverUrl + `/resale/update/${id}`, requestOptions)
        .then((response) => response.json())
        .then((json) => {
            dispatch({ type: 'UPDATE_RESALE', payload: json })
        })

}

export const resaleApi = {createNewResale, getResales, getProductTypes, updateResale, getOneResale}
