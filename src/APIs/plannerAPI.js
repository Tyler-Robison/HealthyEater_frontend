import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// contains all API calls related to mealplanner endpoints. 

class PlannerAPI {

    static async setMeal(id, token, data) {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.post(`${BASE_URL}/meals/${id}`, data, { headers })
            return res.data
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
            return res.data
        } catch (err) {
            console.log(err)
        }
    }

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