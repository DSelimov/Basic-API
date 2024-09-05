import JokeResponseInterface from "../Interfaces/JokeResponseInterface";

const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Any'; 

/**
 * Service class to fetch jokes from the Joke API.
 * 
 * @class JokeService
 * @description This class provides methods to interact with the Joke API and retrieve jokes.
 */
class JokeService {
    
     /**
     * Fetches a joke from the Joke API.
     * 
     * @async
     * @method getJoke
     * @returns {Promise<JokeResponseInterface>} - A promise that resolves to a `JokeResponseInterface` object containing the joke data.
     * @throws {Error} - Throws an error if there is an issue with the API request or if the response is not OK.
     */
    public async getJoke(): Promise<JokeResponseInterface> {
        try {
            const response = await fetch(JOKE_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json() as JokeResponseInterface;
            console.log(data)
            return data;
        } catch (error) {
            throw new Error(`Error fetching joke: ${(error as Error).message}`);
        }
    }
}

export default JokeService;
