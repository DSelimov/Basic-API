import WeatherResponseInterface from '../Interfaces/WeatherResponseInterface';
import dotenv from 'dotenv';

dotenv.config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY as string; 

/**
 * Service class for fetching and formatting weather data.
 * 
 * @class WeatherService
 * @description Provides methods to retrieve and format weather information from the OpenWeatherMap API.
 */
class WeatherService {
    
    private readonly BASE_URL: string = 'https://api.openweathermap.org/data/2.5/weather';


     /**
     * Formats the weather data into a human-readable string.
     * 
     * @private
     * @method formatWeatherData
     * @param {WeatherResponseInterface} data - The weather data to format.
     * @returns {string} - A formatted string with weather details.
     */
    private formatWeatherData(data: WeatherResponseInterface): string {
        const { weather, main, wind, name, sys, timezone } = data;

        const sunrise = new Date((sys.sunrise + timezone) * 1000).toLocaleTimeString();
        const sunset = new Date((sys.sunset + timezone) * 1000).toLocaleTimeString();
        const temperature = main.temp.toFixed(1);
        const feelsLike = main.feels_like.toFixed(1);
        const tempMin = main.temp_min.toFixed(1);
        const tempMax = main.temp_max.toFixed(1);
        const pressure = main.pressure;
        const humidity = main.humidity;
        const windSpeed = wind.speed.toFixed(1);
        const windDirection = wind.deg;
        const description = weather[0].description;

        return `
            Weather in ${name} (${data.sys.country}):
            - Description: ${description.charAt(0).toUpperCase() + description.slice(1)}
            - Temperature: ${temperature}°C
            - Feels Like: ${feelsLike}°C
            - Min Temperature: ${tempMin}°C
            - Max Temperature: ${tempMax}°C
            - Pressure: ${pressure} hPa
            - Humidity: ${humidity}%
            - Wind Speed: ${windSpeed} m/s
            - Wind Direction: ${windDirection}°
            - Sunrise: ${sunrise}
            - Sunset: ${sunset}
        `;
    }

     /**
     * Fetches weather data for a specified city.
     * 
     * @async
     * @method getWeather
     * @param {string} city - The name of the city to get the weather for.
     * @returns {Promise<WeatherResponseInterface>} - A promise that resolves to a `WeatherResponseInterface` object containing weather data.
     * @throws {Error} - Throws an error if the API request fails or if the response is not OK.
     */
    public async getWeather(city: string): Promise<WeatherResponseInterface> {
        try {
            const url = `${this.BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`; 
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json() as WeatherResponseInterface;
            return data;
        } catch (error) {
            throw new Error(`Error fetching weather data: ${error}`);
        }
    }
}

export default WeatherService;
