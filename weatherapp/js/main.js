import WeatherData from "./WeatherData.mjs";
import { openForecast, closeForecast, outsideClick } from "./Modal.mjs";

const submit_Loc = document.getElementById('submit_city');

// let city = "";
// let state = "";

submit_Loc.addEventListener('click', (e) => {
    e.preventDefault();
    const citySel = document.getElementById('city');
    const stateSel = document.getElementById('state');
    const city = citySel.value;
    const state = stateSel.value;
    const weather = new WeatherData(city, state);
    weather.init();
});

// const weather = new WeatherData(city, state);
// weather.init();