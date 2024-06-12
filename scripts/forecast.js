const apiKey = "YAO1CaOhGZB3yd7qyvPXkHsFMeImwlBr";

// get city information
const getCity = async (city) => {
    // base url
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";

    // query parameters
    const query = `?apikey=${apiKey}&q=${city}`;

    // fetch data from the api
    const response = await fetch(base + query);

    const data = await response.json();

    // return the first element of the array which is the closest to the city name
    return data[0];
};

// get weather information
const getWeather = async (locationKey) => {
    //330119

    // base url
    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${locationKey}?apikey=${apiKey}`;

    // fetch data from the api
    const response = await fetch(base + query);

    const data = await response.json();

    return data[0];
};

