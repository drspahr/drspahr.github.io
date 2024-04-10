export function setLocalStorage(key, data) {
    localStorage.setItem(key, data);
}
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function getDateTime(date) {
    let wDay = getDay(date.getDay());
    let month = getMonth(date.getMonth());
    let day = date.getDate();
    let year = date.getFullYear();

    return `${wDay}, ${month} ${day}, ${year}`;
}
export function getDay(day) {
    let weekDay;
    switch (day) {
        case 0: weekDay = "Sunday"; break;
        case 1: weekDay = "Monday"; break;
        case 2: weekDay = "Tuesday"; break;
        case 3: weekDay = "Wednesday"; break;
        case 4: weekDay = "Thursday"; break;
        case 5: weekDay = "Friday"; break;
        case 6: weekDay = "Saturday"; break;
    } return weekDay;
}
export function getMonth(month) {
    let curMonth;
    switch (month) {
        case 0: curMonth = "Jan"; break;
        case 1: curMonth = "Feb"; break;
        case 2: curMonth = "Mar"; break;
        case 3: curMonth = "Apr"; break;
        case 4: curMonth = "May"; break;
        case 5: curMonth = "Jun"; break;
        case 6: curMonth = "Jul"; break;
        case 7: curMonth = "Aug"; break;
        case 8: curMonth = "Sep"; break;
        case 9: curMonth = "Oct"; break;
        case 10: curMonth = "Nov"; break;
        case 11: curMonth = "Dec"; break;
    } return curMonth;
}
