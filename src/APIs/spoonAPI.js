import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// contains all API calls related to spoontacular endpoints. 

class SpoonacularAPI {

    // ingredientsList is an array of strings ['ham', 'cheese']
    static async getRecipes(ingredientsList, nutrientObj, token, id) {
        try {
            // console.log('API incoming', params)

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


    static async getRecipeDetail(recipeId, token, id) {
        try {
            const config = {
                params: {
                    recipeId: recipeId
                },
                headers: { Authorization: `Bearer ${token}` }
            }
            // console.log('API incoming', params)
    
            const res = await axios.get(`${BASE_URL}/recipes/detail/${id}`, config)
            return res.data
        }
        catch (err) {
            console.log(err)
        }
    }
}

export default SpoonacularAPI;