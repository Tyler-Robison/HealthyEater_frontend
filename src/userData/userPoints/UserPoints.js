import React, { useContext } from "react";
import { useFormik } from "formik";
import pointsValidate from "./pointsValidate";
import GlobalContext from "../../context/GlobalContext";
import calculatePoints from "./calcPoints";
import PlannerAPI from "../../APIs/plannerAPI";
import './UserPoints.css'

// calculates weekly points allowance based on user input
// points is added to currentUser and will be displayed in mealplan
const UserPoints = () => {
    const { currentUser, setCurrentUser, token } = useContext(GlobalContext);
    const validate = pointsValidate;

    const formik = useFormik({
        initialValues: {
            gender: '',
            age: '',
            height: '',
            weight: '',
            PAL: ''
        },
        validate,
        onSubmit: values => savePoints(values),
    });

    // get values from form -> calculate points
    // attempt to update back-end, if works, update currUser
    const savePoints = async (values) => {
        if (values.PAL === '') values.PAL = 0;
        if (values.gender === '') values.gender = 'male';
        const { PAL, age, gender, height, weight } = values;
        const points = calculatePoints(gender, +age, +height, +weight, +PAL);
        const res = await PlannerAPI.setPoints(currentUser.id, points, token);
        currentUser.points = res.points;
        setCurrentUser({ ...currentUser, currentUser });
    }

    return (
        <div className="UserPoints">
            <div className="row mt-3">
                <div className="UserPoints-div col-12">
                    <h1>Find Your Daily Points!</h1>
                    {currentUser.points && <p className="calc-para"><b>Daily Points set to {currentUser.points}</b></p>}

                    <form onSubmit={formik.handleSubmit}>
                        <div className="UserPoints-calc-div">
                            <div><label htmlFor="gender">Gender</label></div>
                            <select
                                id="gender"
                                name="gender"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>

                        <div className="UserPoints-calc-div">
                            <div><label htmlFor="age">Age</label></div>
                            <input
                                id="age"
                                name="age"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.age}
                            />
                            {formik.touched.age && formik.errors.age && (
                                <div>{formik.errors.age}</div>
                            )}
                        </div>

                        <div className="UserPoints-calc-div">
                            <div><label htmlFor="height">Height (inches)</label></div>
                            <input
                                id="height"
                                name="height"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.height}
                            />
                            {formik.touched.height && formik.errors.height && (
                                <div>{formik.errors.height}</div>
                            )}
                        </div>

                        <div className="UserPoints-calc-div">
                            <div><label htmlFor="weight">Weight (lbs)</label></div>
                            <input
                                id="weight"
                                name="weight"
                                type='number'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.weight}
                            />
                            {formik.touched.weight && formik.errors.weight && (
                                <div>{formik.errors.weight}</div>
                            )}
                        </div>

                        <div className="UserPoints-calc-div">
                            <div><label htmlFor="PAL">Physical Activity Level</label></div>
                            <select
                                id="PAL"
                                name="PAL"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value={0}>Very Low (Mostly sitting, little to no exercise)</option>
                                <option value={2}>Low (Significant standing/walking, no rigorous exercise)</option>
                                <option value={4}>Moderate (Light exercise multiple times per week)</option>
                                <option value={6}>High (Rigorous exercise multiple times per week)</option>
                            </select>
                        </div>
                        <button className="general-btn" type="submit">Calculate Points</button>
                    </form>

                    <p className="calc-para">Calculation used to determine weekly points allowance</p>
                    <p className="calc-para">Based on Weight Watchers Smart Points System</p>
                </div>
            </div>
        </div>
    )
}

export default UserPoints;