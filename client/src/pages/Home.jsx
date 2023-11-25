import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';



const Home = () => {
  const { Data } = useSelector(state => state.user)
  const [userData, setUserData] = useState({
    userId: '',
    firstname: '',
    lastname: ''
  })
  useEffect(() => {
    setUserData({
      ...userData,
      userId: Data.userId,
      firstname: Data.firstname,
      lastname: Data.lastname
    })
  }, [Data])
  return (
    <div className='flex flex-col min-h-screen  w-screen overflow-hidden'>
      <Navbar />
      <div className=' w-full h-[650px] flex justify-center items-center'>
        <div className='flex shadow-md p-6 flex-col w-[60%] space-y-2 justify-center items-center'>
          <p>firstname: <span className='text-neutral-600'>{Data.firstname}</span></p>
          <p>lastname: <span className='text-neutral-600'>{Data.lastname}</span></p>
          <p>userId: <span className='text-neutral-600'>{Data.userId}</span></p>
        </div>
      </div>
    </div>

  );
};

export default Home;
