import React, { useContext } from "react";
import { useFormik } from "formik";
import PlannerAPI from "../../APIs/plannerAPI";
import GlobalContext from "../../context/GlobalContext";

const PlanForm = ({ days }) => {

    const { token, currentUser, setCurrentUser } = useContext(GlobalContext);

    const formik = useFormik({
        initialValues: {
            daySelect: '',
            mealSelect: ''
        },
        onSubmit: values => handleFormikSubmit(values)
    })

    const handleFormikSubmit = async (values) => {
        let { daySelect, mealSelect } = values

        const meal = (mealSelect === '' ? currentUser.recipes[0] : 
        JSON.parse(mealSelect))

        if (daySelect === '') daySelect = 'Mon'
        const data = {
            day: daySelect,
            recipe_id: meal.recipe_id
        }

        const mealRes = await PlannerAPI.setMeal(currentUser.id, token, data)
        // console.log('meal res', mealRes)

        // mealPlannerRow contains:
        // id, recipe_id, day from user_mealplan table AND
        // ww_points, name from recipes table 
        currentUser.mealplan.push(mealRes.mealplannerRow)

        setCurrentUser({ ...currentUser, currentUser })
    }

    const dayValues = days.map((day, idx) => {
        return <option key={idx} value={day}>{day}</option>
    })

    const recipeValues = currentUser.recipes.map(recipe => {
        const recipeObj = {
            name: recipe.name,
            recipe_id: recipe.recipe_id,
            ww_points: recipe.ww_points
        }
        
        // store recipeObj as string, convert back to object upon formSubmit
        return <option key={recipe.recipe_id} value={JSON.stringify(recipeObj)}>{recipe.name}</option>
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="daySelect">Select Day</label>
            <select
                id="daySelect"
                name="daySelect"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >{dayValues}</select>

            <label htmlFor="mealSelect">Select Meal</label>
            <select
                id="mealSelect"
                name="mealSelect"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >{recipeValues}</select>


            <button className="general-btn" type="submit">Add to Calendar</button>
        </form>
    )
}

export default PlanForm;