import React from "react";
import { useFormik } from "formik";
import ingredientValidate from './ingredientValidate'

/** IngredientForm allows users to enter ingredients
 * 
 * submitted ingredients are added to ingredientsList state
  */
const IngredientForm = ({ ingredientsList, setIngredientsList }) => {
    const validate = ingredientValidate

    const formik = useFormik({
        initialValues: {
            ingredient: ''
        },
        validate,
        onSubmit: values => addIngredient(values),
    })

    const addIngredient = (values) => {
        const { ingredient } = values;
        if (ingredient === '') return
        formik.resetForm();
        setIngredientsList([...ingredientsList, ingredient]);
    }


    return (
        <form onSubmit={formik.handleSubmit}>

            <input
                className="test-input"
                id="ingredient"
                name="ingredient"
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ingredient}
                placeholder='Enter Ingredient'
            />

            {formik.touched.ingredient && formik.errors.ingredient && (
                <div className="error-msg">{formik.errors.ingredient}</div>
            )}

            <div>
                <button className="general-btn my-2" type="submit">Add Ingredient</button>
            </div>
        </form>
    )
}

export default IngredientForm;