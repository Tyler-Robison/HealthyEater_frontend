import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** contains all API calls related to user endpoints.  */
class UserAPI {

    /** POSTS a new user to users table and logs them in
     * 
     * Registration requires valid username/password  */
    static async register(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    /** POST - authenticates an existing user and logs them in  */
    static async login(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/token`, data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    /** API call that returns currentUser
     * 
     * GETS all info related to user auth, points, recipes and mealplan */
    static async getUserInfo(id, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/users/${id}`, { headers })
            return res.data.user
        } catch (err) {
            console.log(err)
        }
    }
}

export default UserAPI;