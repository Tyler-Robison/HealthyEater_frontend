import React from "react";
import { useFormik } from "formik";
import './NutrientForm.css'
import nutrientValidate from './nutrientValidate'

const NutrientForm = ({ setFat, setSatFat, setSugar, setProtein, setSodium, setCholesterol, setCarbs, setCalories }) => {
    const validate = nutrientValidate;

    const formik = useFormik({
        validate,
        initialValues: {
            maxFat: '',
            maxSaturatedFat: '',
            maxCalories: '',
            maxCarbs: '',
            maxSugar: '',
            maxSodium: '',
            maxCholesterol: '',
            minProtein: ''
        },
        onSubmit: values => addNutrients(values),
    })

    const addNutrients = (values) => {
        const { maxFat, maxSaturatedFat, maxCalories, maxCarbs, maxSugar, maxSodium, maxCholesterol, minProtein } = values
        setFat(maxFat)
        setSatFat(maxSaturatedFat)
        setCarbs(maxCarbs)
        setCalories(maxCalories)
        setSugar(maxSugar)
        setSodium(maxSodium)
        setCholesterol(maxCholesterol)
        setProtein(minProtein)
    }

    return (
        <form className="AddIngredient-Form" onSubmit={formik.handleSubmit}>
            <div className="nutrient-form-div">
                <div className="nutrient-input-div">
                    <div><label htmlFor="fat">Max Fat (grams)</label></div>
                    <input
                        id="fat"
                        name="maxFat"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxFat}
                    />
                </div>
                {formik.touched.maxFat && formik.errors.maxFat && (
                    <div>{formik.errors.maxFat}</div>
                )}

                <div className="nutrient-input-div">
                    <div><label htmlFor="satFat">Max Sat Fat (grams)</label></div>
                    <input
                        id="satFat"
                        name="maxSaturatedFat"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxSaturatedFat}
                    />
                </div>
                {formik.touched.maxSatFat && formik.errors.maxSatFat && (
                    <div>{formik.errors.maxSatFat}</div>
                )}

                <div className="nutrient-input-div">
                    <div><label htmlFor="carbs">Max Carbs (grams)</label></div>
                    <input
                        id="carbs"
                        name="maxCarbs"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxCarbs}
                    />
                </div>
                {formik.touched.maxCarbs && formik.errors.maxCarbs && (
                    <div>{formik.errors.maxCarbs}</div>
                )}

                <div className="nutrient-input-div">
                    <div><label htmlFor="calories"> Max Calories (kCals)</label></div>
                    <input
                        id="calories"
                        name="maxCalories"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxCalories}
                    />
                </div>
                {formik.touched.maxCalories && formik.errors.maxCalories && (
                    <div>{formik.errors.maxCalories}</div>
                )}


                <div className="nutrient-input-div">
                    <div><label htmlFor="cholesterol">Max Cholesterol (mg)</label></div>
                    <input
                        id="cholesterol"
                        name="maxCholesterol"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxCholesterol}
                    />
                </div>
                {formik.touched.maxCholesterol && formik.errors.maxCholesterol && (
                    <div>{formik.errors.maxCholesterol}</div>
                )}

                <div className="nutrient-input-div">
                    <div><label htmlFor="sugar">Max Sugar (grams)</label></div>
                    <input
                        id="sugar"
                        name="maxSugar"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxSugar}
                    />
                </div>
                {formik.touched.maxSugar && formik.errors.maxSugar && (
                    <div>{formik.errors.maxSugar}</div>
                )}

                <div className="nutrient-input-div">
                    <div><label htmlFor="sodium">Max Sodium (mg)</label></div>
                    <input
                        id="sodium"
                        name="maxSodium"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.maxSodium}
                    />
                </div>
                {formik.touched.maxSodium && formik.errors.maxSodium && (
                    <div>{formik.errors.maxSodium}</div>
                )}

                <div className="nutrient-input-div">
                    <div><label htmlFor="protein">Min Protein (grams)</label></div>
                    <input
                        id="protein"
                        name="minProtein"
                        type='number'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.minProtein}
                    />
                </div>
                {formik.touched.minProtein && formik.errors.minProtein && (
                    <div>{formik.errors.minProtein}</div>
                )}
            </div>
            <div>
                <button className="general-btn set-nutrients-btn" type="submit">Update Values</button>
            </div>
        </form>
    )
}

export default NutrientForm;