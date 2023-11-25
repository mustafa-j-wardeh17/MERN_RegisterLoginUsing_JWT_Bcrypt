import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLogout } from '../redux/userReducer/userSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { Data } = useSelector(state => state.user)
  useEffect(() => {
    if (Data.userId === '') {
      setIsLoggedIn(false)
    }
    else {
      setIsLoggedIn(true)
    }
  }, [Data])


  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(SetLogout())
  }

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }
  return (
    <div className='w-full p-2 flex justify-end border-2 px-6 border-e-neutral-700'>
      <button onClick={(e) => handleLogout(e)} type='click' className={`${isLoggedIn ? 'flex' : 'hidden'} bg-red-500 rounded-md shadow-md px-2 py-[5px] font-bold text-white`}>
        Logout
      </button>
      <button onClick={(e) => handleLogin(e)} type='click' className={`${!isLoggedIn ? 'flex' : 'hidden'} bg-green-500 rounded-md shadow-md px-2 py-[5px] font-bold text-white`}>
        Login
      </button>
    </div>
  )
}

export default Navbar