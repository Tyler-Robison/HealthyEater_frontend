import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// contains all API calls related to recipe endpoints. 

class RecipeAPI {

    // Saves a recipe if a user clicks to save it
    // Won't add to db if user alreday has that recipe
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

    // gets user's list of saved recipes
    static async getRecipes(id, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/recipes/${id}`, { headers })
            return res.data

        } catch (err) {
            console.log(err)
        }
    }

    // removes from user's list of saved recipes
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

export default RecipeAPI;