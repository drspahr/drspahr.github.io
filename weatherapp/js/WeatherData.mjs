import { setLocalStorage } from "../js/utilities.mjs";

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
                console.log(data);
            } else {
                throw Error(await response.text());
            } 
        } catch (error) {
            console.log(error);
        }
    }

    async init () {
        this.getWeather(this.currentPath, curWeather=true, curForecast=false);
        this.getWeather(this.forecastPath, curWeather=false, curForecast=True);
    }

    saveWeather (data, curWeather, curForecast) {
        let key = "";
        const weatherSave = [];
        const weatherArray = [];
        
        if (curWeather) {
            weatherArray.push(data.main.pressure);
            weatherArray.push(data.main.temp);
            weatherArray.push(data.wind.speed);
            weatherArray.push(data.sys.sunrise);
            weatherArray.push(data.sys.sunset);
            weatherArray.push(data.weather.ico);
            weatherArray.push(data.weather.descriptioin);
            weatherArray.push(dt);
            weatherSave = JSON.stringify(weatherArray);
            key = 'ls-cWeather'; 
        }

        if (curForecast) {
            let item;
            for (item in data.list) {
                let dateTime = new Date(item.clout.dt * 1000);
                let dHour = dateTime.getHours();
                if (dHour == '12:00:00') {
                    weatherArray.push(item.main.pressure);
                    weatherArray.push(item.main.temp);
                    weatherArray.push(item.weather.icon);
                    weatherArray.push(item.weather.description);
                    weatherArray.push(item.wind.speed);
                    weatherSave = JSON.stringify(weatherArray);
                    key = 'ls-fWeather';
                }
            }
        }

        setLocalStorage(key, weatherSave);
        weatherArray.length = 0;
        weatherSave.length = 0;
        
    }
}