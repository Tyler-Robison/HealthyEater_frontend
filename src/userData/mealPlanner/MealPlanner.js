import './MealPlanner.css'
import React, { useContext } from 'react'
import Day from './Day'
import PlanForm from './PlanForm'
import GlobalContext from '../../context/GlobalContext'

const MealPlanner = () => {
    const { currentUser } = useContext(GlobalContext);
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

    console.log('curr user', currentUser)

    const calculateWeeksPoints = () => {
        let weekPoints = 0;
        for (let ele of currentUser.mealplan) {
            weekPoints += ele.ww_points;
        }
        return weekPoints
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
            <br></br>
            <div className="week-div">
                {days.map((day, idx) => {
                    return <Day day={day} />
                })}
            </div>
            <PlanForm days={days} />
       
        </div>
    )
}

export default MealPlanner;