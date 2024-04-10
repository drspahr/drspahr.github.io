import WeatherData from "./WeatherData.mjs";
import { getDateTime } from "./utilities.mjs";
import { openForecast, closeForecast, outsideClick } from "./Modal.mjs";

const todayDate = getDateTime(new Date());
document.querySelector('.datetime').textContent = todayDate;
document.querySelector('.year').textContent = new Date().getFullYear();

const submit_Loc = document.getElementById('submit_city');

submit_Loc.addEventListener('click', (e) => {
    e.preventDefault();
    const citySel = document.getElementById('city');
    const stateSel = document.getElementById('state');
    const city = citySel.value;
    const state = stateSel.value;
    const weather = new WeatherData(city, state);
    weather.init();
});