import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** contains all API calls related to mealplanner endpoints.  */

class PlannerAPI {

    /** POSTS a row in user_mealplan table based on passed in data (day, recipeId, userId)  */
    static async setMeal(id, token, data) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.post(`${BASE_URL}/meals/${id}`, data, { headers })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    /** PATCHES points value in users table  */
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

    /** DELETES individual row in user_mealplan table  */
    static async deleteMeal(id, mealId, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.delete(`${BASE_URL}/meals/${id}/${mealId}`, { headers })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

    /** DELETES ALL rows for a given user in user_mealplan table  */
    static async deleteAllMeals(id, token) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.delete(`${BASE_URL}/meals/${id}`, { headers })
            return res
        } catch (err) {
            console.log(err)
        }
    }

}

export default PlannerAPI;