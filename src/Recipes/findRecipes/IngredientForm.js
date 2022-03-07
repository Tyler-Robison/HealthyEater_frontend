import React from "react";
import { useFormik } from "formik";
import ingredientValidate from './ingredientValidate'

import './IngredientForm.css'


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
        <form className="AddIngredient-Form" onSubmit={formik.handleSubmit}>

                <input
                    className="test-input"
                    id="ingredient"
                    name="ingredient"
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.ingredient}
                />
                  {formik.touched.ingredient && formik.errors.ingredient && (
                    <div>{formik.errors.ingredient}</div>
                )}
     
            <button className="general-btn" type="submit">Add ingredient</button>
        </form>
    )
}

export default IngredientForm;