import React from 'react'
import NavBar from '../components/NavBar'

function AboutUs() {
  return (
    <div>
        <NavBar/>
        <div className='flex items-center justify-center h-screen'>
          <h1 className='text-black font-bold text-5xl'>This is my About Us Page!</h1>
        </div>
    </div>
  ) 
}

export default AboutUs
