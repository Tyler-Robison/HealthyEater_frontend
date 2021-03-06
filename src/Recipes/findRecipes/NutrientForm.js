import React from "react";
import { useFormik } from "formik";
import './NutrientForm.css'
import nutrientValidate from './nutrientValidate'
import useTimedMessage from "../../customHooks/useTimedMessage";

/** NutrientForm sets the state of the 8 nutrients that can optionally be used to constrain recipe search
 * 
 * Any nutrients with a user inputted value will be used to constrain search, others are ignored
 * 
 * User must click "Set Nutrient Constraints" button for constraints to be applied
  */
const NutrientForm = ({ setFat, setSatFat, setSugar, setProtein, setSodium, setCholesterol, setCarbs, setCalories }) => {
    const [isMsgActive, setIsMsgActive] = useTimedMessage(1500)
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
        setIsMsgActive(true)
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
        <form onSubmit={formik.handleSubmit}>
            <div className="NutrientForm-container">
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
                    <div className="error-msg">{formik.errors.maxFat}</div>
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
                {formik.touched.maxSaturatedFat && formik.errors.maxSaturatedFat && (
                    <div className="error-msg">{formik.errors.maxSaturatedFat}</div>
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
                    <div className="error-msg">{formik.errors.maxCarbs}</div>
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
                    <div className="error-msg">{formik.errors.maxCalories}</div>
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
                    <div className="error-msg">{formik.errors.maxCholesterol}</div>
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
                    <div className="error-msg">{formik.errors.maxSugar}</div>
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
                    <div className="error-msg">{formik.errors.maxSodium}</div>
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
                    <div className="error-msg">{formik.errors.minProtein}</div>
                )}
            </div>
            <div>
                {isMsgActive ?  <button className="general-btn-green NutrientForm-set-nutrients-btn" type="submit">Values Updated!</button> : 
                <button className="general-btn NutrientForm-set-nutrients-btn" type="submit">Set Nutrient Constraints</button>}

            </div>
        </form>
    )
}

export default NutrientForm;