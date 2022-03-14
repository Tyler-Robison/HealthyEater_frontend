import React, { useContext, useEffect } from "react";
import UserAPI from "../APIs/userAPI";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import loginValidate from './user_validators/loginValidate'
import GlobalContext from "../context/GlobalContext";
import useTimedMessage from "../customHooks/useTimedMessage";
import './LoginForm.css'


const LoginForm = () => {
    const validate = loginValidate
    const navigate = useNavigate();
    const { currentUser, login } = useContext(GlobalContext)
    const [isMsgActive, setIsMsgActive] = useTimedMessage()

    useEffect(() => {
        if (currentUser) navigate('/')
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: values => loginUser(values),
    })

    const loginUser = async (values) => {
        try {
            const res = await UserAPI.login(values)
            login(res.token);
            navigate('/')
            
        } catch (err) {
            console.log('error', err)
            formik.resetForm();
            setIsMsgActive(true)
        }
    }

    return (
        <div className="LoginForm">
            <div className="LoginForm-div">
                <h1>Enter Username/Password</h1>
                {isMsgActive ? <p>Invalid Username/Password</p> : null}

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
                    <button className="general-btn LoginForm-btn" data-testid="login-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;