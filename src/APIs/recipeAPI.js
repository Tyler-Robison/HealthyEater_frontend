import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


/** contains all API calls related to recipe endpoints.  */

class RecipeAPI {

      /** POSTS a recipe to recipes table if a user clicks to save it
     * 
     * Recipe will only be added to recipes table if it doesn't already exist there
     * 
     * recipe will only be added to users_recipes if currentUser hasn't already saved that recipe */
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

    /** GETS users list of saved recipes  */
    static async getRecipes(id, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${BASE_URL}/recipes/${id}`, { headers })
            return res.data

        } catch (err) {
            console.log(err)
        }
    }

   /** DELETES individual row in users_recipes 
    * 
    * does not remove any rows from recipes as that would cascade to other users  */
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