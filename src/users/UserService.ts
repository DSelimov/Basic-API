import UserInterface from "../Interfaces/UserInterface";

/**
 * Service class for managing users.
 * 
 * @class UserService
 * @description Provides methods to fetch user information, either by user ID or to get a list of all users.
 */
class UserService
{
     /**
     * Retrieves a user by their ID.
     * 
     * @async
     * @method getUserById
     * @param {number} id - The ID of the user to retrieve.
     * @returns {Promise<UserInterface>} - A promise that resolves to a `UserInterface` object containing user details.
     * @throws {string} - Throws an error message if the user is not found.
     */
    public getUserById = async(id:number):Promise<UserInterface> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user: UserInterface = {id, name: 'John Doe', email: 'john.doe@example.com'};

                if(user) {
                    resolve(user);
                }
                else{
                    reject('User not found');
                }
            },1000)
        })
    }

      /**
     * Retrieves a list of all users.
     * 
     * @async
     * @method getAllUsers
     * @returns {Promise<UserInterface[]>} - A promise that resolves to an array of `UserInterface` objects containing details of all users.
     */
    public getAllUsers = async():Promise<UserInterface[]> => {
        return new Promise((resolve) => {
            setTimeout(()=>{
                const users: UserInterface[] = [
                    { id: 1, name: "John Doe", email: "john.doe@example.com" },
                    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
                    { id: 3, name: "Jane Smith", email: "jane.smith@example.com" },
                    { id: 4, name: "Jane Smith", email: "jane.smith@example.com" },
                    { id: 5, name: "Jane Smith", email: "jane.smith@example.com" },
                    { id: 6, name: "Jane Smith", email: "jane.smith@example.com" },
                ];
                resolve(users);
            },1000)
        })
    }
}

export default UserService;
