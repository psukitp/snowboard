const showPopup = (name, duration = 3) => {
    const popup = document.querySelector(`.popup__${name}`);
    popup.classList.add('active')
    setTimeout(() => popup.classList.remove('active'), duration * 1000);
}

export const popupUtils = {showPopup}