import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// contains all API calls related to user endpoints. 

class UserAPI {

    // registration for new users
    static async register(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    // login for existing users
    static async login(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/token`, data)
            // console.log('API login', res.data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    // API call used to create currentUser
    // obtains all info related to user auth
    // Also contains user points, recipes and meal plan
    static async getUserInfo(id, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/users/${id}`, { headers })
            // console.log('got user', res)
            return res.data.user
        } catch (err) {
            console.log(err)
        }
    }
}

export default UserAPI;