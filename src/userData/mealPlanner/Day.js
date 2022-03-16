import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import PlannerAPI from "../../APIs/plannerAPI";
import { Link } from "react-router-dom";
import './Day.css'
import { v4 as uuid } from 'uuid';


const Day = ({ day }) => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext)

    const deleteMeal = async (meal_id) => {
        const res = await PlannerAPI.deleteMeal(currentUser.id, meal_id, token)

        currentUser.mealplan = currentUser.mealplan.filter(m => m.id !== res.id)

        setCurrentUser({ ...currentUser, currentUser })
    }


    // day = 'Mon', 'Tues' etc
    const daysMeals = currentUser.mealplan.filter(meal => day === meal.day)

    let totalPoints = 0;
    for (let ele of daysMeals) {
        totalPoints += ele.ww_points;
    }

    return (
        <div className='Day col-lg'>
            <p><b>{day}</b></p>

            <div className="list-container">
                <ol>
                    {daysMeals.map(d => {
                        return <li key={uuid()}> <Link to={`/${d.recipe_id}/detail`} className='RecipeList-para'><b>{d.name}</b></Link> ({d.ww_points ? d.ww_points : 'Not Available'} points)
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