import React from 'react'
import Sidebar from '../components/Sidebar'
// import NavBar from '../components/NavBar'

const Dashboard = () => {
  return (
    <div>
        {/* <NavBar/> */}
        <Sidebar/>
      <div className='flex items-center justify-center h-screen'>
          <h1 className='text-black font-bold text-5xl'>This is the Dashboard!</h1>
        </div>
    </div>
  )
}

export default Dashboard
