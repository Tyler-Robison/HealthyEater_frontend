import React, { useContext } from "react";
import { useFormik } from "formik";
import PlannerAPI from "../../APIs/plannerAPI";
import GlobalContext from "../../context/GlobalContext";

/** Form used to add meals to mealplanner
 * 
 * User selects a day and recipe to add to that day
 * 
 * days can have duplicate recipes*/
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
        let { daySelect, mealSelect } = values;

        // handle form not being touch by user
        if (daySelect === '') daySelect = 'Mon';
        if (mealSelect === '') mealSelect = currentUser.recipes[0].recipe_id;

        const data = {
            day: daySelect,
            recipe_id: +mealSelect
        }

        const mealRes = await PlannerAPI.setMeal(currentUser.id, token, data)

        // mealPlannerRow contains:
        // id, recipe_id, day from user_mealplan table AND
        // ww_points, name from recipes table 
        currentUser.mealplan.push(mealRes.mealplannerRow)

        setCurrentUser({ ...currentUser, currentUser })
    }

    const dayValues = days.map(day => <option key={day} value={day}>{day}</option>)

    const recipeValues = currentUser.recipes.map(recipe => {
        return <option key={recipe.recipe_id} value={recipe.recipe_id}>{recipe.name}</option>
    })

    return (
        <div className="MealPlanner-form">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="daySelect">Select Day</label>
                <select
                    id="daySelect"
                    name="daySelect"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mx-2"
                >{dayValues}</select>

                <label htmlFor="mealSelect">Select Meal</label>
                <select
                    id="mealSelect"
                    name="mealSelect"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mx-2"
                >{recipeValues}</select>


                <button className="general-btn m-2" type="submit">Add to Calendar</button>
            </form>
        </div>
    )
}

export default PlanForm;