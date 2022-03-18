import './MealPlanner.css'
import React, { useContext } from 'react'
import Day from './Day'
import PlanForm from './PlanForm'
import GlobalContext from '../../context/GlobalContext'
import PlannerAPI from '../../APIs/plannerAPI'
import { Link } from 'react-router-dom'

/** Mealplanner allows users to set their saved recipes into days of the week
 * 
 * Calculates daily and weekly points used based on recipes inputted into planner
 * 
 * renders PlanForm, the component used to add meals to mealplanner
 * 
 * Individual meals can be deleted by clicking on the red 'X' button, all meals can be deleted with Clear Calendar button*/
const MealPlanner = () => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext);
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    const calculateWeeksPoints = () => currentUser.mealplan.reduce((accum, nextEle) => {
            return accum += nextEle.ww_points
        }, 0)
    

    const deleteMealplan = async () => {
        await PlannerAPI.deleteAllMeals(currentUser.id, token);
        currentUser.mealplan = [];
        setCurrentUser({ ...currentUser, currentUser });
    }

    if (currentUser.recipes.length === 0) return <p className="no-recipe-para">You have no saved recipes, go to <Link to={`/findrecipes`} className='RecipeList-para'><b>Find Recipes</b></Link></p>

    return (
        <div className='MealPlanner'>
            <div className='row d-flex flex-column align-items-center mt-3'>
                {/* if user hasn't calculated their points they can still use mealplanner but points functionality won't be there */}
                {!currentUser.points ? <p className='no-recipe-para'>Use <Link to={`/points`}><b>Point Calculator</b></Link> to determine points allotment </p> :
                    <div className='MealPlanner-header col-12'>
                        {currentUser.points && <h3>Weekly points used: {calculateWeeksPoints()}</h3>}
                        {currentUser.points && <p className='MealPlanner-explain-para'>Point Allowance - Daily: {currentUser.points}, Weekly: {currentUser.points * 7} Bonus: {Math.floor(currentUser.points * 1.4)}</p>}
                        {currentUser.points && <p className='MealPlanner-explain-para'>Bonus points can be used during the week for days when you exceed {currentUser.points} points</p>}
                        {currentUser.points && <p className='MealPlanner-explain-para'>Bonus points don't count towards weekly total</p>}
                    </div>}
            </div>

            <button className='general-btn-red mb-2' onClick={deleteMealplan}>Clear Calendar</button>

            <div className=' week-container container vw-100 mx-2'>
                <div className="MealPlanner-week-div row">
                    {days.map(day => <Day key={day} day={day} />)}
                </div>
            </div>

            <PlanForm days={days} />

        </div>
    )
}

export default MealPlanner;