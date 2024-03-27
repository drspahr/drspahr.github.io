const x = document.getElementById('demo');

const buttonGPS = document.querySelector('.gpsBtn');
buttonGPS.addEventListener('click', getLocation);

function getLocation() {
    try {
        navigator.geolocation.getCurrentPosition(showPosition);
    } catch {
        x.innerHTML = err;
    }
}

function showPosition(position) {
    x.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>Longitude ' + position.coords.longitude;
}

let map;
async function initMap() {
    // The location of user
    const position = {lat: 38.10042527593918, lng: -97.91837067673404};
    //const {Map} = await google.maps.importLibrary('maps');
    //const {AdvancedMarkerElement} = await google.maps.importLibrary('marker');
    // The map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: position,
        mapId: "Demo_Map_ID",
    });
    //The marker
    const marker = new google.maps.Marker({
        map: map,
        position: position,
        title: "Home",
    });
}

initMap();

// const apiKey = "AIzaSyCd8eRTAaNNAXnBsVJ8ADdk0aVGEnedVcs"