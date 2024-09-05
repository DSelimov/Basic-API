/**
 * Interface representing the structure of a weather response.
 * 
 * @interface WeatherResponseInterface
 * @property {number} visibility - The visibility in meters.
 * @property {any} clouds - Cloudiness information (the type can be more specific if known).
 * @property {Object[]} weather - An array of weather conditions.
 * @property {string} weather[].description - A description of the weather condition.
 * @property {Object} main - Main weather data.
 * @property {number} main.temp - The current temperature in Celsius.
 * @property {number} main.feels_like - The temperature as it feels to the human body in Celsius.
 * @property {number} main.temp_min - The minimum temperature in Celsius.
 * @property {number} main.temp_max - The maximum temperature in Celsius.
 * @property {number} main.pressure - Atmospheric pressure in hPa.
 * @property {number} main.humidity - Humidity percentage.
 * @property {Object} wind - Wind information.
 * @property {number} wind.speed - Wind speed in meters per second.
 * @property {number} wind.deg - Wind direction in degrees.
 * @property {string} name - The name of the location.
 * @property {Object} sys - System information.
 * @property {string} sys.country - The country code.
 * @property {number} sys.sunrise - Sunrise time in Unix timestamp.
 * @property {number} sys.sunset - Sunset time in Unix timestamp.
 * @property {number} timezone - The timezone offset in seconds from UTC.
 */
export default interface WeatherResponseInterface {
    visibility: number;
    clouds: any;
    weather: { 
        description: string 
    }[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    name: string; 
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
}