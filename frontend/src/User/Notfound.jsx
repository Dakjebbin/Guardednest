
import React from 'react';
import image_404 from "../assets/404-removebg-preview.png"
import logo from '../assets/logosmall.png';

const NotFound = () => {
  return (
        <div className='h-screen items-center justify-center flex'>
  <div className=' w-full flex justify-center items-center flex-wrap  '>
    <div className='flex-grow'>
        <img className='animate-spin translate-y-14 duration-500' src={image_404} alt="" />
    </div>
    <div className='flex-grow flex flex-col items-center'>
   <p className='text-2xl px-5 font-bold'> Something went wrong. The page you are looking for does not exist.</p>
   <div className='w-24 mt-5 '>
    <img className='w-full' src={logo} alt="" />
   </div>
   </div>
    </div>
    </div>
  
)};

export default NotFound;