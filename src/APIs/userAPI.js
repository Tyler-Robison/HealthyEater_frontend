import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// contains all API calls related to recipe endpoints. 

class UserAPI {

    static async register(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    static async login(data) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/token`, data)
            console.log('API login', res.data)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    // API call used to create currentUser
    // obtains all info related to user auth
    // Also contains user points and meal plan
    static async getUserInfo(id, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/users/${id}`, { headers })
            console.log('got user', res)
            return res.data.user
        } catch (err) {
            console.log(err)
        }
    }

    static async saveRecipe(recipeDetail, id, token) {
        try {
            const data = recipeDetail
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.post(`${BASE_URL}/recipes/${id}`, data, { headers })
            return res.data

        } catch (err) {
            console.log(err)
        }
    }

    static async getRecipes(id, token) {
        try {
            // route only needs userId, which can be obtained from token
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/recipes/${id}`, { headers })
            return res.data

        } catch (err) {
            console.log(err)
        }
    }

    // baseUrl/:id   w/ method as delete more restful? 
    // id is userId
    static async removeRecipe(id, recipeId, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.delete(`${BASE_URL}/recipes/${id}/${recipeId}`, { headers })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }


}

export default UserAPI;