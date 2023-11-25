import React, { useState } from 'react'

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Input } from 'postcss';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SetUserData } from '../redux/userReducer/userSlice';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [err, setErr] = useState('')
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setErr(false);
            const response = await axios.post('/login', {
                email: data.email,
                password: data.password,
            });

            // Handle successful response
            const { token, user } = response.data;
            // Update your state with the user data and token
            // ...
            dispatch(SetUserData({ userId: user._id, firstname: user.firstname, lastname: user.lastname }));
            console.log(user);
            setErr('');
            navigate('/');

            setData({
                email: '',
                password: '',
            });
        } catch (error) {
            // Handle error response
            if (error.response && error.response.status === 400) {
                setErr(error.response.data.err);
            } else {
                console.error(error);
                // Handle other errors
            }
        }
    };



    const handleGoogleLogin = () => {

    }
    const handleAppleLogin = () => {

    }

    return (
        <div className='w-screen h-screen bg-green-50/60 flex flex-col justify-center items-center'>
            <div className='shadow-lg flex flex-col justify-center  rounded-md shadow-green-100 bg-white h-[90%] p-4 space-y-4 px-[60px] w-[420px] '>
                <div className='flex flex-col items-center'>
                    <img src='/logo.jpg' className='w-[60] h-[60px]' />
                    <h1 className='font-bold tracking-wider text-center text-[26px]'>Login</h1>
                    <p className='text-neutral-600 mt-2 mb-8 text-[13px]'>Remember everything important.</p>
                </div>
                <div className='flex flex-col space-y-2 justify-center'>
                    <div onClick={handleGoogleLogin} className='cursor-pointer flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
                        <FcGoogle />
                        <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Google</p>
                    </div>
                    <div onClick={handleAppleLogin} className='cursor-pointer flex justify-center items-center p-2 border px-4 rounded-md transition-all hover:bg-gray-100'>
                        <FaApple />
                        <p className='text-neutral-600 text-[14px] ml-2 tracking-wider'>Continue With Apple</p>
                    </div>
                    <div className='flex flex-row text-neutral-300 items-center'>
                        <div className='h-[1px] w-[50%] bg-neutral-300' />
                        <p className='mx-2'>or</p>
                        <div className='h-[1px] w-[50%] bg-neutral-300' />

                    </div>
                </div>
                <form onSubmit={(e) => handleLogin(e)} className='flex flex-col items-center space-y-[6px] '>
                    <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} type="email" placeholder="Email" className='w-full text-[14px] py-3 px-[15px] text-neutral-600 border rounded-md  ' />
                    <input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} type="password" placeholder="password" className='w-full text-[14px] py-3 px-[15px] text-neutral-600 border rounded-md ' />
                    <button type="submit" className='flex items-center justify-center text-center text-neutral-100 font-bold bg-green-600 p-2 w-full rounded-md shadow-md'>Login</button>
                    {
                        err !== null ?
                            <p className='text-red-500 text-[13px]'>{err}</p>
                            : ''
                    }
                </form>
                <div className=' flex justify-center text-[14px] text-neutral-500 space-x-2 ' >
                    <input type='checkbox' />
                    <p>Remember me for 30 days</p>
                </div>
                <div className=' flex flex-col items-center text-[14px] space-y-1  text-neutral-500 space-x-2 ' >
                    <p>Don't have an account?</p>
                    <Link to={'/register'} className='text-green-500 '>
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login