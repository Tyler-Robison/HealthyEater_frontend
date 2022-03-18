import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** contains all API calls related to spoontacular endpoints.  */
class SpoonacularAPI {

    /** GETS all returned recipes from recipes/complex/:id  */
    static async getRecipes(ingredientsList, nutrientObj, token, id) {
        try {
            const config = {
                params: {
                    ingredients: ingredientsList,
                    nutrientObj
                },
                headers: { Authorization: `Bearer ${token}` }
            }

            const res = await axios.get(`${BASE_URL}/recipes/complex/${id}`, config)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    /** GETS recipe detail from recipes/detail/:id  */
    static async getRecipeDetail(recipeId, token, id) {
        try {
            const config = {
                params: {
                    recipeId: recipeId
                },
                headers: { Authorization: `Bearer ${token}` }
            }

            const res = await axios.get(`${BASE_URL}/recipes/detail/${id}`, config)
            return res.data
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default SpoonacularAPI;