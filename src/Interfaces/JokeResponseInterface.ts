/**
 * Interface representing the structure of a joke response.
 * 
 * @interface JokeResponseInterface
 * @property {boolean} [error] - Optional flag indicating if there was an error.
 * @property {string} category - The category of the joke.
 * @property {string} type - The type of the joke (e.g., "single", "twopart").
 * @property {string} [joke] - Optional field containing the joke text for single-part jokes.
 * @property {string} [setup] - Optional field containing the setup text for two-part jokes.
 * @property {string} [delivery] - Optional field containing the delivery text for two-part jokes.
 */
export default interface JokeResponseInterface {
    error?: boolean;
    category: string;
    type: string;
    joke?: string;
    setup?: string;
    delivery?: string;
}