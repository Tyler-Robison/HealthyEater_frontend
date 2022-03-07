import React, { useContext, useEffect } from "react";
import UserAPI from "../APIs/userAPI";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import loginValidate from './user_validators/loginValidate'
import GlobalContext from "../context/GlobalContext";
import Message from "../TopLevel/Message";
import './LoginForm.css'


const LoginForm = () => {
    const validate = loginValidate
    const navigate = useNavigate();
    const { currentUser, login, msg, setMsg, clearMsg } = useContext(GlobalContext)

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
            console.log('login res', res)
            // res is a token value
            login(res.token);
            clearMsg()
            navigate('/')
        } catch (err) {
            console.log('error', err)
            setMsg('Invalid Username/Password')
        }
    }

    return (
        <div className="LoginForm">
            <div className="LoginForm-div">
                <h1>Enter Username/Password</h1>
                <Message msg={msg}/>

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