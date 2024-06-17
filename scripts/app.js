const form = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateTimeAndIcon = (weatherInfo) => {
    const iconSrc = `img/icons/${weatherInfo.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // update the time of day
    const timeSrc = weatherInfo.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
}


const updateCity = async (city) => {

    const cityInfo = await getCity(city);
    const weatherInfo = await getWeather(cityInfo.Key);

    return { cityInfo, weatherInfo };
};

const updateUI = (data) => {


    console.log(data);


    // destructure properties
    const { cityInfo, weatherInfo } = data;

    const temperature = cityInfo.TimeZone.Code == 'EDT' ? weatherInfo.Temperature.Imperial.Value : weatherInfo.Temperature.Metric.Value;



    // update the html with the city and weather info
    details.innerHTML =
        ` <h4 class="my-3">${cityInfo.EnglishName}</h4>
          <div class="my-3">${weatherInfo.WeatherText}</div>

          <div class="display-4 my-4">
            <span class>${temperature}</span>
            <span class>&deg;${cityInfo.TimeZone.Code == 'EDT' ? 'f' : 'c'}</span>
           </div>
        `;


    // update the time and icon
    updateTimeAndIcon(weatherInfo);

    // only show the card when the city is searched
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};


form.addEventListener('submit', e => {
    // prevent default form submission
    e.preventDefault();

    // get the value of the input field
    const city = form.city.value.trim();
    form.reset();

    // store city locally
    localStorage.setItem('city', city);


    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log('rejected,', err));

});


// check if the city is stored locally

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log('rejected,', err));
}

