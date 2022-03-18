import React, { useContext, useEffect } from "react";
import UserAPI from "../APIs/userAPI";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import signupValidate from "./user_validators/signupValidate";
import GlobalContext from "../context/GlobalContext";
import useTimedMessage from "../customHooks/useTimedMessage";
import './SignupForm.css'

/** SignupForm allows users to create new accounts
 * 
 * upon succesful registration currentUser will be created, allowing all components to access user info*/
const SignupForm = () => {
    const validate = signupValidate
    const navigate = useNavigate();
    const { currentUser, login } = useContext(GlobalContext)
    const [failureMsg, setfailureMsg] = useTimedMessage()

    useEffect(() => {
        if (currentUser) navigate('/')
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: values => signup(values),
    })

    // login sets token, which triggers useEffect in App.js
    const signup = async (values) => {
        try {
            const res = await UserAPI.register(values)
            login(res.token);
            formik.resetForm();
            navigate('/');
        } catch (err) {
            setfailureMsg(true)
            formik.resetForm();
        }
    }

    return (
        <div className="SignupForm">
            <div className="row mt-3">
                <div className="SignupForm-div col-12">

                    <h1>Enter Username/Password</h1>
                    {failureMsg && <p>That username is already taken</p>}
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <div><label htmlFor="username">Username</label></div>
                            <input
                                id="username"
                                name="username"
                                type='text'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                placeholder="Username"
                            />
                            {formik.touched.username && formik.errors.username && (
                                <div>{formik.errors.username}</div>
                            )}
                        </div>
                        <div>
                            <div><label htmlFor="password">Password</label></div>
                            <input
                                id="password"
                                name="password"
                                type='password'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="Password"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div>{formik.errors.password}</div>
                            )}
                        </div>
                        <button className="general-btn SignupForm-btn" type="submit">Sign-up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;