class Forecast {
    constructor() {
        this.apiKey = "YAO1CaOhGZB3yd7qyvPXkHsFMeImwlBr";
        this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
        this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    };

    async updateCity(city) {

        const cityInfo = await this.getCity(city);
        const weatherInfo = await this.getWeather(cityInfo.Key);

        return { cityInfo, weatherInfo };
    };

    async getCity(city) {

        // query parameters
        const query = `?apikey=${this.apiKey}&q=${city}`;

        // fetch data from the api
        const response = await fetch(this.cityURI + query);

        const data = await response.json();

        // return the first element of the array which is the closest to the city name
        return data[0];
    }

    async getWeather(locationKey) {

        const query = `${locationKey}?apikey=${this.apiKey}`;

        // fetch data from the api
        const response = await fetch(this.weatherURI + query);

        const data = await response.json();

        return data[0];
    }
}



