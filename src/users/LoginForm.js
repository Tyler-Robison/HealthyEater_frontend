import React, { useContext, useEffect } from "react";
import UserAPI from "../APIs/userAPI";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import loginValidate from './user_validators/loginValidate'
import GlobalContext from "../context/GlobalContext";
import useTimedMessage from "../customHooks/useTimedMessage";
import './LoginForm.css'

/** LoginForm allows existing users to login
 * 
 * upon succesful login currentUser will be created, allowing all components to access user info*/
const LoginForm = () => {
    const validate = loginValidate
    const navigate = useNavigate();
    const { currentUser, login } = useContext(GlobalContext)
    const [failureMsg, setFailureMsg] = useTimedMessage()

    useEffect(() => {
        if (currentUser) navigate('/')
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: values => loginUser(values),
    })

    // login sets token, which triggers useEffect in App.js
    const loginUser = async (values) => {
        try {
            const res = await UserAPI.login(values)
            login(res.token);
            navigate('/')

        } catch (err) {
            formik.resetForm();
            setFailureMsg(true)
        }
    }

    return (
        <div className="LoginForm">
            <div className="row mt-3">
                <div className="LoginForm-div col-12">
                    <h1>Enter Username/Password</h1>
                    {failureMsg && <p className="error-msg">Invalid Username/Password</p>}

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
                                <div className="error-msg">{formik.errors.username}</div>
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
                                <div className="error-msg">{formik.errors.password}</div>
                            )}
                        </div>
                        <button className="general-btn LoginForm-btn" data-testid="login-btn" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;