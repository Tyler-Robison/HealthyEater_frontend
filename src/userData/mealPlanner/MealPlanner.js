import './MealPlanner.css'
import React, { useContext } from 'react'
import Day from './Day'
import PlanForm from './PlanForm'
import GlobalContext from '../../context/GlobalContext'
import PlannerAPI from '../../APIs/plannerAPI'

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


    if (!currentUser) return <p>Loading...</p>
    if (currentUser.recipes.length === 0) return <h2>Use Find Recipes and click "Save Recipe"</h2>

    return (
        <div className='MealPlanner'>
            <div className='MealPlanner-header'>
                <h1>{currentUser.username}'s Mealplan </h1>
                {currentUser.points && <h3>Point Allowance - Daily: {currentUser.points}, Weekly: {currentUser.points * 7} Bonus: {Math.floor(currentUser.points * 1.4)}</h3>}
                {currentUser.points && <h5>Bonus points can be used during the week for days when you exceed {currentUser.points} points</h5>}
                {currentUser.points && <h5>Bonus points don't count towards weekly total</h5>}
            </div>
            {currentUser.points && <h3>Weekly points used: {calculateWeeksPoints()}</h3>}
            <button className='general-btn-red' onClick={deleteMealplan}>Clear Calendar</button>
            <br></br>

            <div className='container w-100 mx-2'>
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