import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// contains all API calls related to spoontacular endpoints. 

class PlannerAPI {

    static async setMeal(id, token, data) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.post(`${BASE_URL}/meals/${id}`, data, { headers })
            // return res.data
        } catch (err) {
            console.log(err)
        }
    }

    static async setPoints(id, points, token) {
        try {
            const data = { points: points }
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.patch(`${BASE_URL}/meals/${id}`, data, { headers })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteMeal(id, meal_id, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.delete(`${BASE_URL}/meals/${id}/${meal_id}`, { headers })
            return res
        } catch (err) {
            console.log(err)
        }
    }

    // static async getRecipesByIngredient(ingredientsList) {
    //     console.log('ingredList', ingredientsList)
    //     try {
    //         const params = {
    //             ingredients: ingredientsList
    //         }
    //         console.log('API incoming', params)

    //         const res = await axios.get(`${BASE_URL}/recipes/ingredient`, { params })
    //         console.log('API res', res)
    //         return res.data
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // static async getRecipes(ingredientsList, nutrientObj) {
    //     console.log('ingredList', ingredientsList)
    //     try {
    //         const params = {
    //             ingredients: ingredientsList,
    //             nutrientObj
    //         }
    //         console.log('API incoming', params)

    //         const res = await axios.get(`${BASE_URL}/recipes/complex`, { params })
    //         console.log('API res', res)
    //         return res.data
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    // static async getRecipeDetail(recipeId) {
    //     console.log('recipdeId', recipeId)
    //     try {
    //         const params = {
    //             recipeId: recipeId
    //         }
    //         console.log('API incoming', params)

    //         const res = await axios.get(`${BASE_URL}/recipes/detail`, { params })
    //         console.log('********')
    //         console.log('recipe detail res', res)
    //         return res.data
    //     }
    //     catch (err) {
    //         console.log(err)
    //     }
    // }

    // static async getMealPlan(calories) {
    //     console.log('cals', calories)
    //     try {

    //         const params = {
    //             calories: calories
    //         }

    //         const res = await axios.get(`${BASE_URL}/meals`, { params })
    //         return res.data
    //         console.log('meal API res', res)
    //     } catch (err) {
    //         console.log('get meal plan API err', err)
    //     }
    // }
}

export default PlannerAPI;