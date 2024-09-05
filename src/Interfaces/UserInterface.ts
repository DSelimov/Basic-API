/**
 * Interface representing a user.
 * 
 * @interface User
 * @property {number} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 */
export default interface User {
    id: number,
    name: string,
    email: string
}