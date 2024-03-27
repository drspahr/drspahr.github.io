const currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Hutchinson,KS,US&units=imperial&appid=6018f46e2305c3ccbf39479a93a557cc';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Hutchinson,KS,US&units=imperial&appid=6018f46e2305c3ccbf39479a93a557cc';

class WeatherData {
    constructor() {

    }
    async getWeather(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

// Get modal element
const modal = document.getElementsByClassName('modal')[0];
// Get open modal element
const imgDiv = document.querySelector('.weather_icon');
// Get close modal element
const closeModal = document.getElementsByClassName('close_button')[0];

// Listen for open
imgDiv.addEventListener('click', openForecast);
// Listen for close
closeModal.addEventListener('click', closeForecast);
window.addEventListener('click', outsideClick);
window.addEventListener('resize', function() {
    if (this.window.innerWidth >= 700) {
        modal.style.display = "none";
    }
})

function openForecast() {
    if (window.innerWidth <= 699)
    modal.style.display = "block";
}

function closeForecast() {
    modal.style.display = "none";
}

function outsideClick(e) {
    if (e.target == modal) modal.style.display = "none";
}