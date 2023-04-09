const getPhotoURL = (path, folder) => {
    if (path === null) {
        return `${process.env.REACT_APP_SERVER_URL}/${folder}/standard.png`
    } else {
        return `${process.env.REACT_APP_SERVER_URL}/${path}`;
    }
}

export const userUtils = { getPhotoURL }