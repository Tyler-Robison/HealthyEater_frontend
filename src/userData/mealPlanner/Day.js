import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import PlannerAPI from "../../APIs/plannerAPI";
import UserAPI from "../../APIs/userAPI";
import { Link } from "react-router-dom";
import './Day.css'

// static async deleteMeal(id, meal_id, token) {
const Day = ({ day }) => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext)

    const deleteMeal = async (meal_id) => {
        const res = await PlannerAPI.deleteMeal(currentUser.id, meal_id, token)
        const user = await UserAPI.getUserInfo(currentUser.id, token)
        setCurrentUser(user)
        console.log('delete res', res)
    }


    // day = 'Mon', 'Tues' etc
    const daysMeals = currentUser.mealplan.filter(meal => day === meal.day)

    let totalPoints = 0;
    for (let ele of daysMeals) {
        totalPoints += ele.ww_points;
    }

    console.log('meal plan', daysMeals)

    return (
        <div className='Day'>
            <p><b>{day}</b></p>
            <ol>
            {/* <Link to={`/${d.recipe_id}/detail`} className='RecipeList-para'><b>{recipe.name}</b></Link> ({d.ww_points ? d.ww_points : 'Not Available'} points) */}
                {daysMeals.map(d => {
                    return <li> <Link to={`/${d.recipe_id}/detail`} className='RecipeList-para'><b>{d.name}</b></Link> ({d.ww_points ? d.ww_points : 'Not Available'} points)
                        <button className="general-btn-red small-btn" onClick={() => deleteMeal(d.id)}>X</button>
                    </li>
                })}
            </ol>
            {totalPoints > 0 && <p className="Day-points"><b>Total Points:</b> {totalPoints}</p>}
        </div>
    )
}

export default Day;