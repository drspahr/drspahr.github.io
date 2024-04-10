import { setLocalStorage } from "./Utilities.mjs";
import { renderData } from "./Render.mjs"

let curWeather = false;
let curForecast = false;

export default class WeatherData {
    constructor(city, state) {
        this.city = city;
        this.state = state;
        this.currentPath = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},US&units=imperial&appid=6018f46e2305c3ccbf39479a93a557cc`;
        this.forecastPath = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.state},US&units=imperial&appid=6018f46e2305c3ccbf39479a93a557cc`;
    }

    async getWeather(url, curWeather, curForecast) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                this.saveWeather(data, curWeather, curForecast);
            } else {
                throw Error(await response.text());
            } 
        } catch (error) {
            console.log(error);
        }
    }

    async init () {
        this.getWeather(this.currentPath, curWeather=true, curForecast=false);
        this.getWeather(this.forecastPath, curWeather=false, curForecast=true);
        renderData();
    }


    saveWeather (data, curWeather, curForecast) {
        let key = "";
        let weatherSave = [];
        const weatherArray = [];
        
        if (curWeather) {
            weatherArray.push(data.main.pressure);
            weatherArray.push(data.main.temp);
            weatherArray.push(data.wind.speed);
            weatherArray.push(data.sys.sunrise);
            weatherArray.push(data.sys.sunset);
            weatherArray.push(data.weather[0].icon);
            weatherArray.push(data.weather[0].description);
            weatherArray.push(data.dt);
            weatherSave = JSON.stringify(weatherArray);     // maybe put this just before the save to local storage
            key = 'ls-cWeather'; 
        }

        if (curForecast) {
            if(Array.isArray(data.list)) {
                data.list.forEach((item) => {
                    let dateTime = new Date(item.dt * 1000);
                    let dHour = ((dateTime.getHours() * 60) + dateTime.getTimezoneOffset()) / 60;
                    if (dHour == '12') {
                        weatherArray.push({
                            weatherDate: item.dt,
                            pressure: item.main.pressure,
                            temperature: item.main.temp,
                            icon: item.weather[0].icon,
                            description: item.weather[0].description,
                            wind: item.wind.speed
                        });
                    }
                });

                const fWeatherObj = {};
                weatherArray.forEach((day, index) => {
                    const key = `day${index + 1}`;
                    fWeatherObj[key] = {
                        date: day.weatherDate,
                        pressure: day.pressure,
                        temperature: day.temperature,
                        icon: day.icon,
                        description: day.description,
                        wind: day.wind
                    }
                });

                weatherSave = JSON.stringify(fWeatherObj);
                key = 'ls-fWeather';
            }
        }

        setLocalStorage(key, weatherSave);
        weatherArray.length = 0;  // not sure if these lines are needed.
        weatherSave = [];
        
    }
}