export function setLocalStorage(key, data) {
    localStorage.setItem(key, data);
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

