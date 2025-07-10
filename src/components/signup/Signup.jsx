import React, { useEffect } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


import './Signup.css'

import image from '../../images/signup.png'

import { FcGoogle } from "react-icons/fc";

import { registerUser } from '../../redux/userSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { user, loading, error } = useSelector(state => state.user)
    // console.log("user", user);

    // // useEffect(() => {
    // //     if (user) {
    // //         toast.success('account created ')
    // //         navigate('/login');
    // //     }
    // // }, [])


    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })


    const validateInput = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/; // for Indian mobile numbers

        if (emailRegex.test(value)) {
            return 'email';
        } else if (phoneRegex.test(value)) {
            return 'phone';
        } else {
            return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const type = validateInput(form.email);
        if (!type) {
            toast.error('Please enter a valid email or phone number');
            return;
        }
        dispatch(registerUser(form))
            .then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    toast.success('Account created successfully!');
                    navigate('/login');
                }
            })
    }

    return (
        <div className='signup-component'>
            {/* <Toaster/> */}
            <div className='signup-container-one'>
                <img src={image} alt="" />
            </div>
            <div className='signup-container-two'>
                <form action="" className='signup-form' onSubmit={handleSubmit}>
                    <div className='signup-form-div-one'>
                        <h1>Create An Account</h1>
                        <p>Enter your details below</p>
                    </div>

                    <div className='signup-form-div-input'>
                        <input
                            type="text"
                            placeholder='Name'
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className='signup-form-div-input'>
                        <input
                            type="text"
                            placeholder='Email or Phone number'
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className='signup-form-div-input'>
                        <input
                            type="password"
                            placeholder='Password'
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className='singup-from-div-button'>
                        <input type="submit" value="Create Account" style={{cursor:'pointer'}} />
                    </div>

                    <div className='singup-from-div-google'>
                        {/* <div> */}
                        <FcGoogle />

                        <p>signup with google</p>
                        {/* </div> */}
                    </div>
                    <div className='singup-from-div-login'>
                        <p>Already have account? <NavLink to={'/login'}>Login</NavLink></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup