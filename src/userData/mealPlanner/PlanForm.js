import React, { useContext } from "react";
import { useFormik } from "formik";
import PlannerAPI from "../../APIs/plannerAPI";
import UserAPI from "../../APIs/userAPI";
import GlobalContext from "../../context/GlobalContext";

// on submit tries to visit
// http://localhost:3000/recipes/saved-recipes?daySelect=Tues&mealSelect=Cheesy+Ham+and+Shrimp+Macaroni+Au+Gratin
const PlanForm = ({ days, userRecipes }) => {

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

        // obj is stored as a string in select value.
        // handle nothing selected by user
        let meal;
        mealSelect === '' ? meal = currentUser.recipes[0] :
            meal = JSON.parse(mealSelect)

        if (daySelect === '') daySelect = 'Mon'
        const data = {
            day: daySelect,
            recipe_id: meal.recipe_id
        }
        // getUserInfo gets currentUser w/ mealData added via first API call
        await PlannerAPI.setMeal(currentUser.id, token, data)
        const user = await UserAPI.getUserInfo(currentUser.id, token)
        setCurrentUser(user)
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


            <button className="general-btn" type="submit">Place Meal in Selected Data</button>
        </form>
    )
}

export default PlanForm;