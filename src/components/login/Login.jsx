import React, { useEffect, useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import image from '../../images/signup.png'

import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/userSlice'
import toast from 'react-hot-toast'


const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, loading, error } = useSelector(state => state.user)
    // console.log("user",user);
    // console.log("error",error);

    // useEffect(() => {
    //     if(user){
    //         // localStorage.setItem('token', user.token)
    //         toast.success(user.message)
    //         navigate('/')
    //         // return
    //     } else if(error) {
    //         toast.error(error)
    //     }
    // },[error, user])


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(formData))
        .then((res) => {
            console.log(res.payload.token);
            
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success(res.payload.message || 'Login successful!');
                localStorage.setItem('token', res.payload.token)
                navigate('/');
                // window.location.reload()
            } else {
                // Handle known rejection
                toast.error(res.payload || 'Login failed. Please try again.');
            }
        })
        .catch((error) => {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            toast.error('An unexpected error occurred. Please try again.');
        });

    }

    return (
        <div className='login-component'>
            <div className='login-container-one'>
                <img src={image} alt="" />
            </div>
            <div className='login-container-two'>
                <form action="" className='login-form' onSubmit={handleSubmit}>
                    <div className='login-form-div-one'>
                        <h1>Log in to Exclusive</h1>
                        <p>Enter your details below</p>
                    </div>

                    <div className='login-form-div-input'>
                        <input
                            type="text"
                            placeholder='Email or Phone number'
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className='login-form-div-input'>
                        <input
                            type="password"
                            placeholder='Password'
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className='login-form-div-button'>
                        <input type="submit" value="Login" style={{cursor:'pointer'}} />
                        <NavLink className='forgot-password' to={'/forgotpassword'}>Forgot password</NavLink>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login