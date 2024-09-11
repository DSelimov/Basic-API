import express, { Request, Response } from 'express';
import WeatherService from '../weather/weather';
import JokeService from '../jokes/jokeService';
import UserService from '../users/UserService';
import Scraper from '../web_scraper/scraper';
 
const router = express.Router();
const weatherService = new WeatherService();
const jokeService = new JokeService();
const userService = new UserService();
const scraper = new Scraper();  


/**
 * @module Routes
 * @description Defines routes for handling requests related to weather, jokes, and users.
 */

/**
 * Route to get weather data for a specified city.
 * 
 * @route GET /weather
 * @param {Request} req - The request object containing the city query parameter.
 * @param {Response} res - The response object used to send the weather data or error message.
 * @returns {void}
 */
router.get('/weather', async (req: Request, res: Response) => {
    const city = req.query.city as string;

    if (!city) {
        return res.status(400).json({ error: 'City query parameter is required' });
    }

    try {
        const weatherData = await weatherService.getWeather(city);

        // Render the view with weather data
        res.render('weather', { weather: weatherData });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * Route to get a joke.
 * 
 * @route GET /joke
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the joke or error message.
 * @returns {void}
 */
router.get('/joke', async (req: Request, res: Response) => {
    try {
        const jokeData = await jokeService.getJoke();
        // Prepare the joke data for response
        const joke = jokeData.joke || `${jokeData.setup} - ${jokeData.delivery}`;
        res.render('joke', { joke });
    } catch (error) {
        console.error("Error fetching joke:", error);
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * Route to get user details by user ID.
 * 
 * @route GET /user/:id
 * @param {Request} req - The request object containing the user ID parameter.
 * @param {Response} res - The response object used to send the user data or error message.
 * @returns {void}
 */
router.get('/user/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await userService.getUserById(id);
        res.render('user', { user });
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * Route to get a list of all users.
 * 
 * @route GET /users
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the list of users or error message.
 * @returns {void}
 */router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.render('users', { users });
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json({ error: (error as Error).message });
    }
});

/**
 * Route to render the home page.
 * 
 * @route GET /
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to render the home page or send an error message.
 * @returns {void}
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        res.render('home');
    } catch (error) {
        console.error("Error rendering home page:", error);
        res.status(500).json({ error: 'An error occurred while rendering the home page.' });
    }
});


/**
 * @route GET /scrape
 * @description Scrapes data from a hardcoded URL and renders it using the 'scraper' EJS template.
 * 
 * This route uses a `Scraper` instance to fetch and parse data from example.com. The result is rendered
 * using the 'scraper' view. In case of an error, a 500 status code and error message are returned.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to render the view or return an error.
 * 
 * @returns {void} - Renders the 'scraper' view with scraped data or returns a 500 error.
 */
router.get('/scrape', async (req: Request, res: Response) => {
    const url = 'https://example.com'

    try {
        const scraper = new Scraper();
        const scrapedData = await scraper.WebScraper(url);

        res.render('scraper', { data: scrapedData });
    } catch (error) {
        console.error('Error scraping the webpage:', error);
        res.status(500).json({ error: (error as Error).message });
    }
});

export default router;