import { getLocalStorage, getDay } from "./Utilities.mjs";

function currentWeatherData(data) {
    // get data from local storage and assign to page
    const sunrise = document.querySelector('.sunrise');
    const sunset = document.querySelector('.sunset');
    const temp = document.querySelector('.tHigh');
    const wind = document.querySelector('.wind');
    const weatherLargeIcon = document.querySelector('#img_select');
    const weatherSmallIcon = document.querySelector('#img_select_small');
    const iconSrc = `https://openweathermap.org/img/wn/${data[5]}@2x.png`;
    const desc = data[6];

    // convert epoch time stamp to a usable time and get the hours and minutes for sunrise and sunset
    let srTime = new Date(data[3] * 1000); 
    let ssTime = new Date(data[4] * 1000);
    sunrise.textContent = `${srTime.getHours()}:${String(srTime.getMinutes()).padStart(2, '0')}`;
    sunset.textContent = `${ssTime.getHours()}:${String(ssTime.getMinutes()).padStart(2, '0')}`;

    // temperature, wind and pressure
    temp.textContent = data[1];
    wind.textContent = data[2];

    // weather icon for large image
    weatherLargeIcon.setAttribute('src', iconSrc);
    weatherLargeIcon.setAttribute('width', 300);
    weatherLargeIcon.setAttribute('height', 300);
    weatherLargeIcon.setAttribute('alt', desc);

    // weather icon for small image
    weatherSmallIcon.setAttribute('src', iconSrc);
    weatherSmallIcon.setAttribute('width', 150);
    weatherSmallIcon.setAttribute('height', 150);
    weatherSmallIcon.setAttribute('alt', desc);
    //return 
}

function forecastWeatherTemplate(data) {
    console.log(data);

    let div = document.querySelector('.forecast');
    div.innerHTML = "";
    div.innerHTML += `<h2>The Next 5-Days</h2>`;

    let x = 1; 
    for (let key in data) {    
        const daily = `
            <div id="fInfo" class="day${x}">
            <h3 class="fDay${x}">${dayOfWeek(data[key].date)}</h3>
            <img class="fImg" src="https://openweathermap.org/img/wn/${data[key].icon}@2x.png" alt=${data[key].description}>
            <div class="fTemp">
                <h3 class="fHigh">Temp: <span class="fHiValue">${data[key].temperature}</span>&deg;<span class="tUnit">F</span></h3>
                <h3 class="fWind">Wind: <span class="fWindValue">${data[key].wind}</span><span class="fUnit"></span></h3>
            </dvi>
            </div>
            `
        x += 1;
        div.innerHTML += daily;
    }    
}

function modalData(data) {
    // modal dates
    const mdate1 = document.querySelector('.modal_date1');
    const mdate2 = document.querySelector('.modal_date2');
    const mdate3 = document.querySelector('.modal_date3');
    const mdate4 = document.querySelector('.modal_date4');
    const mdate5 = document.querySelector('.modal_date5');

    // modal images
    const mImg1 = document.querySelector('.modal_image1');
    const mImg2 = document.querySelector('.modal_image2');
    const mImg3 = document.querySelector('.modal_image3');
    const mImg4 = document.querySelector('.modal_image4');
    const mImg5 = document.querySelector('.modal_image5');

    // modal temps
    const mTmp1 = document.querySelector('.mHigh1');
    const mTmp2 = document.querySelector('.mHigh2');
    const mTmp3 = document.querySelector('.mHigh3');
    const mTmp4 = document.querySelector('.mHigh4');
    const mTmp5 = document.querySelector('.mHigh5');

    for (let key in data) {
        switch (key) {
            case "day1": 
            mdate1.textContent = dayOfWeek(data[key].date);
            mTmp1.textContent = data[key].temperature;
            const iconSrc1 = `https://openweathermap.org/img/wn/${data[key].icon}@2x.png`;
            const altdes1 = data[key].desripton;
            mImg1.setAttribute('src', iconSrc1);
            mImg1.setAttribute('alt', altdes1);
            break;
            case "day2": 
            mdate2.textContent = dayOfWeek(data[key].date);
            mTmp2.textContent = data[key].temperature;
            const iconSrc2 = `https://openweathermap.org/img/wn/${data[key].icon}@2x.png`;
            const altdes2 = data[key].desripton;
            mImg2.setAttribute('src', iconSrc2);
            mImg2.setAttribute('alt', altdes2);
            break;
            case "day3": 
            mdate3.textContent = dayOfWeek(data[key].date);
            mTmp3.textContent = data[key].temperature;
            const iconSrc3 = `https://openweathermap.org/img/wn/${data[key].icon}@2x.png`;
            const altdes3 = data[key].desripton;
            mImg3.setAttribute('src', iconSrc3);
            mImg3.setAttribute('alt', altdes3);
            break;
            case "day4": 
            mdate4.textContent = dayOfWeek(data[key].date);
            mTmp4.textContent = data[key].temperature;
            const iconSrc4 = `https://openweathermap.org/img/wn/${data[key].icon}@2x.png`;
            const altdes4 = data[key].desripton;
            mImg4.setAttribute('src', iconSrc4);
            mImg4.setAttribute('alt', altdes4);
            break;
            case "day5": 
            mdate5.textContent = dayOfWeek(data[key].date);
            mTmp5.textContent = data[key].temperature;
            const iconSrc5 = `https://openweathermap.org/img/wn/${data[key].icon}@2x.png`;
            const altdes5 = data[key].desripton;
            mImg5.setAttribute('src', iconSrc5);
            mImg5.setAttribute('alt', altdes5);
            break;
        }
    }
}

function dayOfWeek(fDate) {
    let wDay;
    const fDay = new Date(fDate * 1000).getDay();
    return getDay(fDay);
}

export function renderData() {
    const currentWeather = getLocalStorage('ls-cWeather');
    const forecastWeather = getLocalStorage('ls-fWeather');

    currentWeatherData(currentWeather);
    forecastWeatherTemplate(forecastWeather);
    modalData(forecastWeather);
}