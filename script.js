let appId = '063b4f1d2a05dd2976b6117f61413b5a';
let units = 'metric';
let searchMethod;
let container = document.getElementById('weatherContainer');

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer) {
    container.style.display = 'block';
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("images/Clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("images/Clouds.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("images/Rain.jpg")';
            break;
        case 'Haze':
        case 'Mist':
        case 'Fog':
            document.body.style.backgroundImage = 'url("images/haze.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("images/Snow.jpge")';
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temp = document.getElementById('temp');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription;

    temp.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeed.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})