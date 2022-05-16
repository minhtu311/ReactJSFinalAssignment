import React, { useState, useContext } from 'react'
import axios from 'axios';
import UserContext from '../../contexts/UserContext';

const validateEmail = email => {
    if (!email) return "Email is required";
    const validEmail = String(email).toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    if (!validEmail) {
        return "Email is invalid"
    }
}

const validatePassword = password => {
    if (!password) return "Password is required";
    if (password.length < 8) return "At least 8 characters";
}

const LoginPage = () => {

    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })

    const { setToken, setUserId } = useContext(UserContext)

    const errorEmail = validateEmail(values.email);
    const errorPassword = validatePassword(values.password);

    const handleChange = (evt) => {
        setValues({
            ...values,
            [evt.target.name]: evt.target.value
        })
    }
    const handleOnBlur = evt => {
        setTouched({
            ...touched,
            [evt.target.name]: true
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setTouched({ email: true, password: true })
        if (errorEmail && errorPassword) return;

        axios({
            method: "GET",
            url: `https://60dff0ba6b689e001788c858.mockapi.io/token`,
            body: {
                email: values.email,
                password: values.password
            }
        }).then((response) => {
            console.log('response = ', response);
            setToken(response.data.token);
            setUserId(response.data.userId);
        })
    };

    return (
        <div className='row'>
            <div className='col-3'></div>
            <form className='col-6' onSubmit={handleSubmit}>
                <h3 className='text-center'>Login</h3>
                <div className='mb-3'>
                    <input
                        className="form-control"
                        type="text"
                        placeholder='Email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        name='email' />
                    {(touched.email) && <div className="form-text text-danger">{errorEmail}</div>}
                </div>
                <div className='mb-3'>
                    <input
                        className="form-control"
                        type="password"
                        placeholder='Password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        name='password' />
                    {(touched.password) && <div className="form-text text-danger">{errorPassword}</div>}
                </div>
                <button className="btn btn-primary col-12" type='submit'>Submit</button>
                {/* { <div className='text-success'><b>Login success</b></div>} */}
            </form>
            <div className='col-3'></div>
        </div>
    )
}

export default LoginPage