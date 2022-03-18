import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import PlannerAPI from "../../APIs/plannerAPI";
import { Link } from "react-router-dom";
import './Day.css'
import { v4 as uuid } from 'uuid';

/** Day represents a single column in the mealplanner
 * 
 * rows in the user_mealplan table contain userId, recipeId and day
 * 
 *  that information allows creation of front-end mealplanner*/
const Day = ({ day }) => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext)

    const deleteMeal = async (meal_id) => {
        const res = await PlannerAPI.deleteMeal(currentUser.id, meal_id, token)

        currentUser.mealplan = currentUser.mealplan.filter(m => m.id !== res.id)

        setCurrentUser({ ...currentUser, currentUser })
    }


    // day = 'Mon', 'Tues' etc
    const daysMeals = currentUser.mealplan.filter(meal => day === meal.day)

    const totalPoints = daysMeals.reduce((accum, nextEle) => accum += nextEle.ww_points, 0)

    return (
        <div className='Day col-lg d-flex flex-column'>
            <p><b>{day}</b></p>

            <div className="list-container flex-grow-1">
                <ol>
                    {daysMeals.map(d => {
                        return <li key={uuid()}> <Link to={`/recipes/${d.recipe_id}`} className='RecipeList-para'><b>{d.name}</b></Link> ({d.ww_points ? d.ww_points : 'Not Available'} points)
                            <button data-testid={d.id} className="general-btn-red small-btn" onClick={() => deleteMeal(d.id)}>X</button>
                        </li>
                    })}
                </ol>
            </div>
            {totalPoints > 0 && <p className="Day-points"><b>Points:</b> {totalPoints}</p>}
        </div>
    )
}

export default Day;