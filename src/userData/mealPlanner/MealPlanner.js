import './MealPlanner.css'
import React, { useContext } from 'react'
import Day from './Day'
import PlanForm from './PlanForm'
import GlobalContext from '../../context/GlobalContext'
import PlannerAPI from '../../APIs/plannerAPI'
import Spinner from '../../Spinner'

const MealPlanner = () => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext);
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    const calculateWeeksPoints = () => {
        let weekPoints = 0;
        for (let ele of currentUser.mealplan) {
            weekPoints += ele.ww_points;
        }
        return weekPoints
    }

    const deleteMealplan = async () => {
        await PlannerAPI.deleteAllMeals(currentUser.id, token);
        currentUser.mealplan = [];
        setCurrentUser({ ...currentUser, currentUser });
    }


    if (!currentUser) return <Spinner />
    if (currentUser.recipes.length === 0) return <h2>Use Find Recipes and click "Save Recipe"</h2>

    return (
        <div className='MealPlanner'>
            <div className='row d-flex flex-column align-items-center mt-3'>
                <div className='MealPlanner-header col-12'>
                    <h1>{currentUser.username}'s Mealplan </h1>
                    {currentUser.points && <p className='MealPlanner-explain-para'>Point Allowance - Daily: {currentUser.points}, Weekly: {currentUser.points * 7} Bonus: {Math.floor(currentUser.points * 1.4)}</p>}
                    {currentUser.points && <p className='MealPlanner-explain-para'>Bonus points can be used during the week for days when you exceed {currentUser.points} points</p>}
                    {currentUser.points && <p className='MealPlanner-explain-para'>Bonus points don't count towards weekly total</p>}
                </div>
            </div>
            {currentUser.points && <h3>Weekly points used: {calculateWeeksPoints()}</h3>}
            <button className='general-btn-red' onClick={deleteMealplan}>Clear Calendar</button>
            <br></br>

            <div className=' week-container container vw-100 mx-2'>
                <div className="MealPlanner-week-div row">
                    {days.map(day => {
                        // return <div className=''> 
                        return <Day key={day} day={day} />
                        // </div> }
                    })}
                </div>
            </div>

            <PlanForm days={days} />

        </div>
    )
}

export default MealPlanner;